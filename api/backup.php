<?php
/* Private filesystem backups. This file contains no credentials. */

function appBackupDirectory() {
    // The hosting does not provide process environment variables reliably.
    // Keep the backup location in the private configuration outside webroot.
    $config = function_exists('appPrivateConfig') ? appPrivateConfig() : [];
    $directory = rtrim((string) ($config['backup_dir'] ?? getenv('APP_BACKUP_DIR') ?? ''), '/\\');
    if ($directory === '' || !is_dir($directory) || !is_writable($directory)) {
        appJsonError(500, 'Prywatny katalog kopii bezpieczeństwa jest niedostępny. Zapis został wstrzymany.');
    }
    return $directory;
}

function appBackupCopyTree($source, $target) {
    if (!is_dir($source)) return;
    if (!is_dir($target) && !mkdir($target, 0700, true) && !is_dir($target)) {
        throw new RuntimeException('Nie można utworzyć katalogu kopii.');
    }
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($source, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    foreach ($iterator as $entry) {
        $relative = substr($entry->getPathname(), strlen($source) + 1);
        $destination = $target . DIRECTORY_SEPARATOR . $relative;
        if ($entry->isDir()) {
            if (!is_dir($destination) && !mkdir($destination, 0700, true) && !is_dir($destination)) {
                throw new RuntimeException('Nie można utworzyć katalogu kopii.');
            }
        } elseif ($entry->isFile()) {
            $parent = dirname($destination);
            if (!is_dir($parent) && !mkdir($parent, 0700, true) && !is_dir($parent)) {
                throw new RuntimeException('Nie można utworzyć katalogu kopii.');
            }
            if (!copy($entry->getPathname(), $destination)) {
                throw new RuntimeException('Nie można skopiować danych do backupu.');
            }
            @chmod($destination, 0600);
        }
    }
}

function appBackupManifest($snapshotDir) {
    $files = [];
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($snapshotDir, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::LEAVES_ONLY
    );
    foreach ($iterator as $entry) {
        if (!$entry->isFile() || basename($entry->getPathname()) === 'manifest.json') continue;
        $relative = substr($entry->getPathname(), strlen($snapshotDir) + 1);
        $files[$relative] = hash_file('sha256', $entry->getPathname());
    }
    ksort($files);
    $manifest = ['created_at' => gmdate('c'), 'files' => $files];
    $manifestPath = $snapshotDir . '/manifest.json';
    if (file_put_contents($manifestPath, json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX) === false) {
        throw new RuntimeException('Nie można zapisać manifestu backupu.');
    }
    @chmod($manifestPath, 0600);
}

function appBackupRemoveTree($path, $root) {
    $realRoot = realpath($root);
    $realPath = realpath($path);
    if ($realRoot === false || $realPath === false || !str_starts_with($realPath, $realRoot . DIRECTORY_SEPARATOR)) {
        throw new RuntimeException('Nieprawidłowy katalog retencji backupu.');
    }
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($realPath, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $entry) {
        $entry->isDir() ? rmdir($entry->getPathname()) : unlink($entry->getPathname());
    }
    rmdir($realPath);
}

function appBackupApplyRetention($backupRoot) {
    foreach ([['daily', 30], ['monthly', 12]] as [$type, $limit]) {
        $root = $backupRoot . '/' . $type;
        if (!is_dir($root)) continue;
        $directories = array_values(array_filter(glob($root . '/*'), 'is_dir'));
        rsort($directories, SORT_STRING);
        foreach (array_slice($directories, $limit) as $oldDirectory) {
            appBackupRemoveTree($oldDirectory, $root);
        }
    }
}

function appBackupBeforeMutation($reason = 'runtime-write') {
    static $completed = false;
    if ($completed) return;

    try {
        $backupRoot = appBackupDirectory();
        $day = gmdate('Y-m-d');
        $month = gmdate('Y-m');
        $snapshotName = gmdate('His') . '-' . preg_replace('/[^a-z0-9-]+/i', '-', $reason);
        $dailyRoot = $backupRoot . '/daily/' . $day;
        $snapshot = $dailyRoot . '/' . $snapshotName;
        if (!mkdir($snapshot, 0700, true) && !is_dir($snapshot)) {
            throw new RuntimeException('Nie można utworzyć kopii bezpieczeństwa.');
        }

        appBackupCopyTree(appStorageDir(), $snapshot . '/storage');
        $configRoot = $snapshot . '/config';
        foreach ([] as $configName) {
            $source = __DIR__ . '/' . $configName;
            if (is_file($source)) {
                if (!is_dir($configRoot)) mkdir($configRoot, 0700, true);
                if (!copy($source, $configRoot . '/' . $configName)) {
                    throw new RuntimeException('Nie można zabezpieczyć konfiguracji aplikacji.');
                }
                @chmod($configRoot . '/' . $configName, 0600);
            }
        }
        appBackupManifest($snapshot);

        $monthlyRoot = $backupRoot . '/monthly/' . $month;
        if (!is_dir($monthlyRoot)) {
            appBackupCopyTree($snapshot, $monthlyRoot);
        }
        appBackupApplyRetention($backupRoot);
        $completed = true;
    } catch (Throwable $error) {
        error_log('Backup before mutation failed: ' . $error->getMessage());
        appJsonError(500, 'Nie udało się wykonać kopii bezpieczeństwa. Zapis został wstrzymany.');
    }
}

function appAtomicWrite($path, $contents) {
    $directory = dirname($path);
    $temporary = $directory . '/.' . basename($path) . '.' . bin2hex(random_bytes(8)) . '.tmp';
    if (file_put_contents($temporary, $contents, LOCK_EX) === false) {
        return false;
    }
    @chmod($temporary, 0600);
    if (!rename($temporary, $path)) {
        @unlink($temporary);
        return false;
    }
    @chmod($path, 0600);
    return true;
}
