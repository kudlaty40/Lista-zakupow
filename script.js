const familyScreen = document.getElementById("family-screen");
const familySelect = document.getElementById("family-select");
const familyContinueButton = document.getElementById("family-continue-button");
const familyScreenError = document.getElementById("family-screen-error");
const openSuperAdminButton = document.getElementById("open-super-admin");
const superAdminScreen = document.getElementById("super-admin-screen");
const superAdminLoginBox = document.getElementById("super-admin-login-box");
const superAdminPanel = document.getElementById("super-admin-panel");
const superAdminPasswordInput = document.getElementById("super-admin-password");
const superAdminLoginButton = document.getElementById("super-admin-login-button");
const superAdminBackButton = document.getElementById("super-admin-back-button");
const superAdminCloseButton = document.getElementById("super-admin-close-button");
const superAdminLogoutButton = document.getElementById("super-admin-logout-button");
const superAdminStatus = document.getElementById("super-admin-status");
const newFamilyNameInput = document.getElementById("new-family-name");
const newFamilyAdminUsernameInput = document.getElementById("new-family-admin-username");
const newFamilyAdminPasswordInput = document.getElementById("new-family-admin-password");
const newFamilyAdminDisplayInput = document.getElementById("new-family-admin-display");
const createFamilyButton = document.getElementById("create-family-button");
const superAdminOldPasswordInput = document.getElementById("super-admin-old-password");
const superAdminNewPasswordInput = document.getElementById("super-admin-new-password");
const changeSuperAdminPasswordButton = document.getElementById("change-super-admin-password-button");
const superAdminFamilyList = document.getElementById("super-admin-family-list");
const familyEditModal = document.getElementById("family-edit-modal");
const familyEditCloseButton = document.getElementById("family-edit-close");
const familyEditCancelButton = document.getElementById("family-edit-cancel");
const familyEditSaveButton = document.getElementById("family-edit-save");
const familyEditNameInput = document.getElementById("family-edit-name");
const familyEditAdminUsernameInput = document.getElementById("family-edit-admin-username");
const familyEditAdminDisplayInput = document.getElementById("family-edit-admin-display");
const familyEditAdminTargetSelect = document.getElementById("family-edit-admin-target");
const familyEditAdminPasswordInput = document.getElementById("family-edit-admin-password");
const familyEditAdminPasswordConfirmInput = document.getElementById("family-edit-admin-password-confirm");
const familyEditAdminPasswordToggle = document.getElementById("family-edit-admin-password-toggle");
const familyEditAdminPasswordConfirmToggle = document.getElementById("family-edit-admin-password-confirm-toggle");
const familyEditPasswordSaveButton = document.getElementById("family-edit-password-save");
const familyEditPasswordStatus = document.getElementById("family-edit-password-status");
const accountEditModal = document.getElementById("account-edit-modal");
const accountEditCloseButton = document.getElementById("account-edit-close");
const accountEditCancelButton = document.getElementById("account-edit-cancel");
const accountEditSaveButton = document.getElementById("account-edit-save");
const accountEditUsernameInput = document.getElementById("account-edit-username");
const accountEditDisplayNameInput = document.getElementById("account-edit-display-name");
const accountEditNoteInput = document.getElementById("account-edit-note");
const accountEditIsAdminCheckbox = document.getElementById("account-edit-is-admin");
const accountEditPasswordInput = document.getElementById("account-edit-password");
const accountEditPasswordConfirmInput = document.getElementById("account-edit-password-confirm");
const loginScreen = document.getElementById("login-screen");
const shopScreen = document.getElementById("shop-screen");
const loginInput = document.getElementById("login-input");
const loginPasswordInput = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");
const loginFamilyLabel = document.getElementById("login-family-label");
const changeFamilyButton = document.getElementById("change-family-button");
const logoutButton = document.getElementById("logout-button");
const addItemButton = document.getElementById("add-item-button");
const clearPurchasedButton = document.getElementById("clear-purchased");
const shopSortToggleButton = document.getElementById("shop-sort-toggle");
const productName = document.getElementById("product-name");
const productQuantity = document.getElementById("product-quantity");
const productUnit = document.getElementById("product-unit");
const productCategory = document.getElementById("product-category");
const productCategorySuggestions = document.getElementById("product-category-suggestions");
const productImageButton = document.getElementById("product-image-button");
const shopItems = document.getElementById("shop-items");
const shopLoadingStatus = document.getElementById("shop-loading-status");
const allItems = document.getElementById("all-items");
const tabButtons = document.querySelectorAll(".tab-button");
const shopTab = document.getElementById("shop-tab");
const allTab = document.getElementById("all-tab");
const diaryTab = document.getElementById("diary-tab");
const settingsTab = document.getElementById("settings-tab");
const userSettingsPanel = document.getElementById("user-settings-panel");
const settingsUserTab = document.getElementById("settings-user-tab");
const settingsAdminTab = document.getElementById("settings-admin-tab");
const addItemSection = document.getElementById("add-item-section");
const adminTools = document.getElementById("admin-tools");
const adminTabButtons = document.querySelectorAll(".admin-tab-button");
const adminAirtablePanel = document.getElementById("admin-airtable-panel");
const adminSyncPanel = document.getElementById("admin-sync-panel");
const adminAccountsPanel = document.getElementById("admin-accounts-panel");
const adminProductsPanel = document.getElementById("admin-products-panel");
const diaryDateInput = document.getElementById("diary-date");
const diaryProductNameInput = document.getElementById("diary-product-name");
const diaryQuantityInput = document.getElementById("diary-quantity");
const diaryUnitInput = document.getElementById("diary-unit");
const addDiaryEntryButton = document.getElementById("add-diary-entry-button");
const diarySummary = document.getElementById("diary-summary");
const diaryItems = document.getElementById("diary-items");
const macroDisplayModeSelect = document.getElementById("macro-display-mode");
const macroVisibleProductsCheckbox = document.getElementById("macro-visible-products");
const macroVisibleDiaryCheckbox = document.getElementById("macro-visible-diary");
const diaryTabVisibleCheckbox = document.getElementById("diary-tab-visible");
const shoppingOwnerVisibleCheckbox = document.getElementById("shopping-owner-visible");
const shoppingCategoryGroupingCheckbox = document.getElementById("shopping-category-grouping");
const allProductsCategoryGroupingCheckbox = document.getElementById("all-products-category-grouping");
const darkThemeToggle = document.getElementById("dark-theme-toggle");
const shoppingMoveOnSelectionCheckbox = document.getElementById("shopping-move-on-selection");
const saveUserSettingsButton = document.getElementById("save-user-settings-button");
const userSettingsStatus = document.getElementById("user-settings-status");
const ownCurrentPasswordInput = document.getElementById("own-current-password");
const ownNewPasswordInput = document.getElementById("own-new-password");
const ownNewPasswordConfirmInput = document.getElementById("own-new-password-confirm");
const changeOwnPasswordButton = document.getElementById("change-own-password-button");
const ownPasswordStatus = document.getElementById("own-password-status");
const accountUsernameInput = document.getElementById("account-username");
const accountPasswordInput = document.getElementById("account-password");
const accountNewPasswordInput = document.getElementById("account-new-password");
const accountDisplayNameInput = document.getElementById("account-display-name");
const accountNoteInput = document.getElementById("account-note");
const accountCreateButton = document.getElementById("account-create-button");
const accountSetPasswordButton = document.getElementById("account-set-password-button");
const accountsLoadButton = document.getElementById("accounts-load-button");
const accountsStatus = document.getElementById("accounts-status");
const accountsList = document.getElementById("accounts-list");
const productsLoadButton = document.getElementById("products-load-button");
const productsStatus = document.getElementById("products-status");
const productsDataList = document.getElementById("products-data-list");
const airtableConnectionStatus = document.getElementById("airtable-connection-status");
const syncModeSelect = document.getElementById("sync-mode");
const syncWeeksInput = document.getElementById("sync-weeks");
const syncDaysInput = document.getElementById("sync-days");
const syncHoursInput = document.getElementById("sync-hours");
const syncMinutesInput = document.getElementById("sync-minutes");
const syncNowButton = document.getElementById("sync-now-button");
const syncStatus = document.getElementById("sync-status");
const offlineStatus = document.getElementById("offline-status");
const superAdminAirtableApiKeyInput = document.getElementById("super-admin-airtable-api-key");
const superAdminAirtableBaseIdInput = document.getElementById("super-admin-airtable-base-id");
const superAdminAirtableTableNameInput = document.getElementById("super-admin-airtable-table-name");
const superAdminAirtableUserFieldInput = document.getElementById("super-admin-airtable-user-field");
const superAdminAirtableDataFieldInput = document.getElementById("super-admin-airtable-data-field");
const superAdminAirtableUpdatedFieldInput = document.getElementById("super-admin-airtable-updated-field");
const superAdminAirtableSaveButton = document.getElementById("super-admin-airtable-save");
const superAdminAirtableTestButton = document.getElementById("super-admin-airtable-test");
const superAdminAirtableStatus = document.getElementById("super-admin-airtable-status");
const superAdminSyncMode = document.getElementById("super-admin-sync-mode");
const superAdminSyncWeeks = document.getElementById("super-admin-sync-weeks");
const superAdminSyncDays = document.getElementById("super-admin-sync-days");
const superAdminSyncHours = document.getElementById("super-admin-sync-hours");
const superAdminSyncMinutes = document.getElementById("super-admin-sync-minutes");
const superAdminSyncFamily = document.getElementById("super-admin-sync-family");
const superAdminSyncSaveButton = document.getElementById("super-admin-sync-save");
const superAdminSyncNowButton = document.getElementById("super-admin-sync-now");
const superAdminSyncStatus = document.getElementById("super-admin-sync-status");
const superAdminTabButtons = document.querySelectorAll(".super-admin-tab");
const superAdminTabPanels = document.querySelectorAll(".super-admin-tab-panel");
const superAdminFamilyCount = document.getElementById("super-admin-family-count");
const superAdminAirtableSummary = document.getElementById("super-admin-airtable-summary");
const superAdminSyncSummary = document.getElementById("super-admin-sync-summary");

let items = [];
let activeTab = "shop";
let currentPreviewItem = null;
let pendingNewItemImage = null;
let currentUser = "";
let currentAccount = null;
let activeAdminTab = "airtable";
let activeSettingsSection = "user";
let diaryEntries = [];
let shoppingSortMode = "created";
const SERVER_STORAGE_URL = "api/products.php";
const ACCOUNTS_STORAGE_URL = "api/user-accounts.php";
const FAMILIES_STORAGE_URL = "api/families.php";
const NUTRITION_PROXY_URL = "api/nutrition.php";
const AIRTABLE_HEALTH_URL = "api/airtable-health.php";
const PRODUCT_IMAGE_URL = "api/product-image.php";
const CLIENT_STORAGE_VERSION = "2026-07-20-storage-v2";
const OFFLINE_QUEUE_VERSION = "v2";
const OFFLINE_DB_NAME = "shopping-list-offline";
const OFFLINE_DB_VERSION = 1;
const OFFLINE_ACCESS_DAYS = 14;
let useServerStorage = true;
const DEFAULT_USER_SETTINGS = {
  macroDisplayMode: "per100g",
  showMacroProducts: false,
  showMacroDiary: true,
  hideDiary: false,
  theme: "light",
  showShoppingOwnerInfo: true,
  syncMode: "manual",
  syncWeeks: 0,
  syncDays: 0,
  syncHours: 0,
  syncMinutes: 30,
};
let userSettings = { ...DEFAULT_USER_SETTINGS };
let userSettingsReady = false;
let userViewSettings = { groupShoppingByCategory: false, moveOnSelection: false };
let syncTimerId = null;
let dataDirty = false;
let lastAirtableSyncAt = null;
let selectedFamily = "";
let families = [];
const collapsedCategorySections = new Set();
const expandedProductActions = new Set();
let superAdminAuthorized = false;
let editingFamilySlug = "";
let editingAccountUsername = "";
let canManageFamilyAdmins = false;
let primaryFamilyAdminUsername = "";
let serverLastSelectedFamily = "";
let offlineWriteChain = Promise.resolve();
let sharedServerRevision = "";
let diaryServerRevision = "";
let syncDebounceTimer = null;
let allProductsLimit = 75;
let legacyImageMigrationActive = false;

function openOfflineDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("Ta przeglądarka nie obsługuje pamięci offline."));
      return;
    }
    const request = window.indexedDB.open(OFFLINE_DB_NAME, OFFLINE_DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("records")) {
        request.result.createObjectStore("records");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Nie można otworzyć pamięci offline."));
  });
}

async function offlineDbRead(key) {
  const db = await openOfflineDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("records", "readonly");
    const request = transaction.objectStore("records").get(key);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error || new Error("Nie można odczytać pamięci offline."));
  }).finally(() => db.close());
}

async function offlineDbWrite(key, value) {
  const db = await openOfflineDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("records", "readwrite");
    transaction.objectStore("records").put(value, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error("Nie można zapisać pamięci offline."));
  }).finally(() => db.close());
}

async function offlineDbDelete(key) {
  const db = await openOfflineDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("records", "readwrite");
    transaction.objectStore("records").delete(key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error("Nie można usunąć danych offline."));
  }).finally(() => db.close());
}

function normalizeUserName(value) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "guest";
}

function normalizeFamilySlug(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized;
}

function getSelectedFamilyStorageKey() {
  return "shoppingSelectedFamily";
}

function getStoredSelectedFamily() {
  return normalizeFamilySlug(localStorage.getItem(getSelectedFamilyStorageKey()) || "");
}

function setSelectedFamily(familySlug) {
  selectedFamily = normalizeFamilySlug(familySlug);
  if (selectedFamily) {
    localStorage.setItem(getSelectedFamilyStorageKey(), selectedFamily);
  } else {
    localStorage.removeItem(getSelectedFamilyStorageKey());
  }
}

function getActiveFamily() {
  return selectedFamily || getStoredSelectedFamily();
}

function getSessionFamilyKey() {
  return "shoppingSessionFamily";
}

function getFamilyScopedStorageKey(baseKey) {
  const family = getActiveFamily() || "default";
  return `${baseKey}:${family}`;
}

function clearAuthSession() {
  const offlineFamily = getActiveFamily();
  localStorage.removeItem("shoppingLoggedIn");
  localStorage.removeItem("shoppingUser");
  localStorage.removeItem("shoppingIsAdmin");
  localStorage.removeItem("shoppingDisplayName");
  localStorage.removeItem("shoppingAdminPassword");
  localStorage.removeItem(getSessionFamilyKey());
  currentUser = "";
  currentAccount = null;
  if (offlineFamily) {
    void offlineDbDelete(getOfflineAccessKey(offlineFamily));
  }
}

async function logoutFromServer() {
  const family = getActiveFamily();
  if (!family) return;
  try {
    await fetch(`${ACCOUNTS_STORAGE_URL}?family=${encodeURIComponent(family)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
  } catch {
    // Local logout still protects the next user of this browser.
  }
}

async function restoreServerSession() {
  const response = await fetch(`${ACCOUNTS_STORAGE_URL}?action=session`, {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });
  const payload = await response.json();
  if (!response.ok || !payload.success || !payload.account || !payload.family) {
    return false;
  }

  setSelectedFamily(payload.family);
  currentUser = normalizeUserName(payload.account.username || "");
  currentAccount = {
    username: currentUser,
    displayName: payload.account.displayName || "",
    isAdmin: payload.account.isAdmin === true,
  };
  void rememberOfflineAccess();
  return currentUser !== "guest";
}

function getFamilyDisplayName(slug) {
  const normalized = normalizeFamilySlug(slug);
  const family = families.find((entry) => normalizeFamilySlug(entry.slug) === normalized);
  return family?.name || normalized;
}

function getActiveUser() {
  return currentUser || localStorage.getItem("shoppingUser") || "guest";
}

function getCurrentUserLogin() {
  return (currentAccount?.username || currentUser || localStorage.getItem("shoppingUser") || "").trim().toLowerCase();
}

function getCurrentUserInitial() {
  const loginSource = getCurrentUserLogin();
  if (loginSource) {
    return loginSource.charAt(0).toUpperCase();
  }

  const displaySource = (currentAccount?.displayName || "").trim();
  if (displaySource) {
    return displaySource.charAt(0).toUpperCase();
  }

  return "?";
}

function normalizeOwnerInitial(value) {
  const normalized = String(value || "").trim().charAt(0).toUpperCase();
  if (!normalized || normalized === "?") {
    return "";
  }
  return normalized;
}

function getSharedStorageKey() {
  return getFamilyScopedStorageKey("shoppingSharedData");
}

function getPendingSharedSyncKey() {
  return getFamilyScopedStorageKey("shoppingPendingSharedSync");
}

function getUserDiaryStorageKey(user = getActiveUser()) {
  return getFamilyScopedStorageKey(`shoppingDiary:${user}`);
}

function getPendingDiarySyncKey(user = getActiveUser()) {
  return getFamilyScopedStorageKey(`shoppingPendingDiarySync:${user}`);
}

function getOfflineRecordKey(scope, user = "") {
  const family = getActiveFamily() || "default";
  return `payload:${scope}:${family}:${user}`;
}

function getOfflineOperationsKey() {
  const family = getActiveFamily() || "default";
  return `operations:${OFFLINE_QUEUE_VERSION}:${family}:shared`;
}

function getOfflineImageKey(itemId) {
  return `image:${getActiveFamily() || "default"}:${String(itemId || "")}`;
}

function getSharedRevisionStorageKey() {
  return getFamilyScopedStorageKey("shoppingSharedRevision");
}

function getDiaryRevisionStorageKey(user = getActiveUser()) {
  return getFamilyScopedStorageKey(`shoppingDiaryRevision:${user}`);
}

function getOfflineAccessKey(family = getActiveFamily()) {
  return `offline-access:${normalizeFamilySlug(family)}`;
}

function createOperationId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function stableJson(value) {
  return JSON.stringify(value ?? null);
}

async function getCachedPayload(scope, user = getActiveUser()) {
  const key = getOfflineRecordKey(scope, scope === "diary" ? user : "");
  try {
    const cached = await offlineDbRead(key);
    if (cached && typeof cached === "object") {
      return cached;
    }
  } catch (error) {
    console.warn("Odczyt IndexedDB nie powiódł się:", error);
  }
  return readJsonFromStorage(scope === "shared" ? getSharedStorageKey() : getUserDiaryStorageKey(user));
}

async function cachePayload(scope, payload, user = getActiveUser()) {
  const key = getOfflineRecordKey(scope, scope === "diary" ? user : "");
  const legacyKey = scope === "shared" ? getSharedStorageKey() : getUserDiaryStorageKey(user);
  try {
    await offlineDbWrite(key, payload);
    localStorage.removeItem(legacyKey);
    return;
  } catch (error) {
    console.warn("Zapis IndexedDB nie powiódł się:", error);
  }
  // Compatibility copy only for browsers that do not offer IndexedDB.
  localStorage.setItem(legacyKey, JSON.stringify(payload));
}

async function getQueuedOperations() {
  try {
    const operations = await offlineDbRead(getOfflineOperationsKey());
    return Array.isArray(operations) ? operations : [];
  } catch (error) {
    console.warn("Odczyt kolejki offline nie powiódł się:", error);
    return [];
  }
}

async function setQueuedOperations(operations) {
  try {
    await offlineDbWrite(getOfflineOperationsKey(), Array.isArray(operations) ? operations : []);
  } catch (error) {
    console.warn("Zapis kolejki offline nie powiódł się:", error);
  }
}

function buildSharedOperations(previousPayload, nextPayload) {
  const previousItems = new Map((previousPayload?.items || []).map((item) => [String(item.id), item]));
  const nextItems = new Map((nextPayload?.items || []).map((item) => [String(item.id), item]));
  const timestamp = new Date().toISOString();
  const operations = [];

  nextItems.forEach((item, id) => {
    if (!previousItems.has(id) || stableJson(previousItems.get(id)) !== stableJson(item)) {
      operations.push({ id: createOperationId(), type: "upsert-item", item, updatedAt: timestamp });
    }
  });
  previousItems.forEach((item, id) => {
    if (!nextItems.has(id)) {
      operations.push({ id: createOperationId(), type: "delete-item", itemId: id, updatedAt: timestamp });
    }
  });
  if (stableJson(previousPayload?.settings || {}) !== stableJson(nextPayload?.settings || {})) {
    operations.push({ id: createOperationId(), type: "replace-settings", settings: nextPayload.settings || {}, updatedAt: timestamp });
  }
  return operations;
}

async function rememberOfflineAccess() {
  const family = getActiveFamily();
  const username = normalizeUserName(currentAccount?.username || currentUser || "");
  if (!family || !username || username === "guest") return;
  await offlineDbWrite(getOfflineAccessKey(family), {
    family,
    username,
    displayName: currentAccount?.displayName || "",
    isAdmin: currentAccount?.isAdmin === true,
    expiresAt: Date.now() + OFFLINE_ACCESS_DAYS * 24 * 60 * 60 * 1000,
  });
}

async function restoreOfflineAccess() {
  const family = getStoredSelectedFamily();
  if (!family) return false;
  try {
    const access = await offlineDbRead(getOfflineAccessKey(family));
    if (!access || access.expiresAt < Date.now() || !access.username) {
      return false;
    }
    setSelectedFamily(family);
    currentUser = normalizeUserName(access.username);
    currentAccount = { username: currentUser, displayName: access.displayName || "", isAdmin: access.isAdmin === true };
    return true;
  } catch {
    return false;
  }
}

function getActiveTabStorageKey(user = getActiveUser()) {
  return getFamilyScopedStorageKey(`shoppingActiveTab:${user}`);
}

function getShoppingSortStorageKey(user = getActiveUser()) {
  return getFamilyScopedStorageKey(`shoppingSortMode:${user}`);
}

function normalizeShoppingSortMode(mode) {
  if (mode === "az" || mode === "za" || mode === "created") {
    return mode;
  }
  return "created";
}

function getStoredShoppingSortMode() {
  const stored = localStorage.getItem(getShoppingSortStorageKey());
  return normalizeShoppingSortMode(stored || "created");
}

function getShoppingSortLabel(mode = shoppingSortMode) {
  if (mode === "az") {
    return "A-Z";
  }
  if (mode === "za") {
    return "Z-A";
  }
  return "kolejność";
}

function updateShoppingSortButtonWidth() {
  if (!shopSortToggleButton) {
    return;
  }

  const labels = ["A-Z", "Z-A", "kolejność"];
  const computed = window.getComputedStyle(shopSortToggleButton);
  const probe = document.createElement("span");

  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.whiteSpace = "nowrap";
  probe.style.font = computed.font;
  probe.style.fontSize = computed.fontSize;
  probe.style.fontWeight = computed.fontWeight;
  probe.style.fontFamily = computed.fontFamily;

  document.body.appendChild(probe);

  let maxTextWidth = 0;
  labels.forEach((label) => {
    probe.textContent = label;
    maxTextWidth = Math.max(maxTextWidth, probe.getBoundingClientRect().width);
  });

  probe.remove();

  const horizontalPadding = (parseFloat(computed.paddingLeft) || 0) + (parseFloat(computed.paddingRight) || 0);
  const horizontalBorder = (parseFloat(computed.borderLeftWidth) || 0) + (parseFloat(computed.borderRightWidth) || 0);
  const targetWidth = Math.ceil(maxTextWidth + horizontalPadding + horizontalBorder);

  shopSortToggleButton.style.width = `${targetWidth}px`;
}

function updateShoppingSortButtonLabel() {
  if (!shopSortToggleButton) {
    return;
  }
  shopSortToggleButton.textContent = getShoppingSortLabel();
}

function updateShoppingCompletionControl() {
  if (!clearPurchasedButton) {
    return;
  }
  clearPurchasedButton.classList.toggle("hidden", userViewSettings.moveOnSelection === true);
}

function getSortedShoppingItems(shoppingItems) {
  if (shoppingSortMode === "created") {
    return shoppingItems;
  }

  const sorted = [...shoppingItems];
  sorted.sort((left, right) => left.name.localeCompare(right.name, "pl", { sensitivity: "base" }));
  if (shoppingSortMode === "za") {
    sorted.reverse();
  }
  return sorted;
}

function toggleShoppingSortMode() {
  if (shoppingSortMode === "created") {
    shoppingSortMode = "az";
  } else if (shoppingSortMode === "az") {
    shoppingSortMode = "za";
  } else {
    shoppingSortMode = "created";
  }
  localStorage.setItem(getShoppingSortStorageKey(), shoppingSortMode);
  updateShoppingSortButtonLabel();
  renderItems();
}

function normalizeTabName(tab) {
  const allowedTabs = ["shop", "all", "diary", "settings"];
  if (tab === "diary" && (!userSettingsReady || userSettings?.hideDiary === true)) return "shop";
  return allowedTabs.includes(tab) ? tab : "shop";
}

function getStoredActiveTab() {
  const storedTab = localStorage.getItem(getActiveTabStorageKey());
  return normalizeTabName(storedTab || "shop");
}

function readJsonFromStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function hasPendingSharedSync() {
  return localStorage.getItem(getPendingSharedSyncKey()) === "1";
}

function hasPendingDiarySync(user = getActiveUser()) {
  return localStorage.getItem(getPendingDiarySyncKey(user)) === "1";
}

function markPendingSharedSync() {
  localStorage.setItem(getPendingSharedSyncKey(), "1");
}

function markPendingDiarySync(user = getActiveUser()) {
  localStorage.setItem(getPendingDiarySyncKey(user), "1");
}

function clearPendingSharedSync() {
  localStorage.removeItem(getPendingSharedSyncKey());
}

function clearPendingDiarySync(user = getActiveUser()) {
  localStorage.removeItem(getPendingDiarySyncKey(user));
}

function normalizeItems(rawItems) {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.map((item) => {
    const storedLogin = String(item.shoppingOwnerLogin ?? item.ownerLogin ?? item.addedByLogin ?? item.createdByLogin ?? "").trim().toLowerCase();
    const storedInitial = item.shoppingOwnerInitial ?? item.ownerInitial ?? item.addedByInitial ?? item.createdByInitial;
    const shouldBackfillForShopping = item.bought !== true;
    const initialFromLogin = storedLogin ? storedLogin.charAt(0).toUpperCase() : "";
    const normalizedStoredInitial = normalizeOwnerInitial(storedInitial);

    return {
      ...item,
      category: String(item.category || "").trim().slice(0, 60),
      selected: item.selected === true,
      lastQuantity: item.lastQuantity ?? item.quantity,
      lastUnit: item.lastUnit ?? item.unit,
      shoppingOwnerLogin: storedLogin || null,
      shoppingOwnerInitial: initialFromLogin || normalizedStoredInitial || null,
    };
  });
}

function normalizeSettings(rawSettings) {
  const next = {
    ...DEFAULT_USER_SETTINGS,
    ...(rawSettings && typeof rawSettings === "object" ? rawSettings : {}),
  };
  if (next.macroDisplayMode !== "perAmount") {
    next.macroDisplayMode = "per100g";
  }
  const hasProductMacroChoice = Object.prototype.hasOwnProperty.call(rawSettings || {}, "showMacroProducts");
  next.showMacroProducts = hasProductMacroChoice
    ? rawSettings.showMacroProducts === true
    : rawSettings?.showMacroShop === true && rawSettings?.showMacroAll === true;
  next.showMacroDiary = next.showMacroDiary !== false;
  next.hideDiary = next.hideDiary === true;
  next.theme = next.theme === "dark" ? "dark" : "light";
  next.showShoppingOwnerInfo = next.showShoppingOwnerInfo !== false;
  next.syncMode = next.syncMode === "auto" ? "auto" : "manual";
  next.syncWeeks = Math.max(0, Number(next.syncWeeks) || 0);
  next.syncDays = Math.max(0, Number(next.syncDays) || 0);
  next.syncHours = Math.max(0, Number(next.syncHours) || 0);
  next.syncMinutes = Math.max(0, Number(next.syncMinutes) || 0);
  return next;
}

function applyAccountTheme() {
  const dark = userSettings.theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function normalizeUserViewSettings(rawSettings) {
  return {
    groupShoppingByCategory: rawSettings?.groupShoppingByCategory === true,
    groupAllProductsByCategory: Object.prototype.hasOwnProperty.call(rawSettings || {}, "groupAllProductsByCategory")
      ? rawSettings.groupAllProductsByCategory === true
      : true,
    moveOnSelection: rawSettings?.moveOnSelection === true,
  };
}

function getCategoryLabel(item) {
  return String(item?.category || "").trim() || "Bez kategorii";
}

function groupItemsByCategory(sourceItems) {
  const groups = new Map();
  sourceItems.forEach((item) => {
    const category = getCategoryLabel(item);
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(item);
  });
  return new Map([...groups.entries()].sort(([left], [right]) => {
    if (left === "Bez kategorii") return 1;
    if (right === "Bez kategorii") return -1;
    return left.localeCompare(right, "pl", { sensitivity: "base" });
  }));
}

function refreshCategorySuggestions() {
  if (!productCategorySuggestions) {
    return;
  }

  const categories = [...new Set(items.map((item) => String(item.category || "").trim()).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, "pl", { sensitivity: "base" }));
  productCategorySuggestions.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    productCategorySuggestions.appendChild(option);
  });
}

function isMacroVisibleForSection(section) {
  if (section === "shop" || section === "all") {
    return userSettings.showMacroProducts === true;
  }
  if (section === "diary") {
    return userSettings.showMacroDiary !== false;
  }
  return true;
}

function buildSharedPayload() {
  return {
    // Binary photo data belongs to the private image endpoint, never to the
    // shared JSON document sent to Airtable or downloaded by every device.
    items: items.map((item) => {
      const copy = { ...item };
      if (typeof copy.image === "string" && copy.image.startsWith("data:image/")) {
        copy.image = null;
      }
      return copy;
    }),
    settings: userSettings,
  };
}

function buildDiaryPayload() {
  return {
    diaryEntries,
    viewSettings: userViewSettings,
  };
}

function applySharedPayload(payload) {
  if (Array.isArray(payload)) {
    items = normalizeItems(payload);
    userSettings = { ...DEFAULT_USER_SETTINGS };
    applyAccountTheme();
    return;
  }

  if (payload && typeof payload === "object") {
    const source = payload.data ?? payload;
    if (typeof payload.revision === "string") {
      sharedServerRevision = payload.revision;
      localStorage.setItem(getSharedRevisionStorageKey(), sharedServerRevision);
    }
    const nextItems = Array.isArray(source?.items)
      ? source.items
      : Array.isArray(payload.items)
        ? payload.items
        : Array.isArray(source)
          ? source
          : [];
    const nextSettings = source?.settings ?? payload.settings;

    items = normalizeItems(nextItems);
    userSettings = normalizeSettings(nextSettings);
    applyAccountTheme();
    return;
  }

  items = [];
  userSettings = { ...DEFAULT_USER_SETTINGS };
  applyAccountTheme();
}

function applyDiaryPayload(payload) {
  const source = payload && typeof payload === "object" ? (payload.data ?? payload) : payload;
  if (payload && typeof payload === "object" && typeof payload.revision === "string") {
    diaryServerRevision = payload.revision;
    localStorage.setItem(getDiaryRevisionStorageKey(), diaryServerRevision);
  }
  if (source && typeof source === "object" && Array.isArray(source.diaryEntries)) {
    diaryEntries = source.diaryEntries;
    userViewSettings = normalizeUserViewSettings(source.viewSettings);
    return;
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.data)) {
    diaryEntries = payload.data;
    userViewSettings = normalizeUserViewSettings(null);
    return;
  }

  if (Array.isArray(payload) && payload.length > 0 && payload[0] && payload[0].date) {
    diaryEntries = payload;
    userViewSettings = normalizeUserViewSettings(null);
    return;
  }

  diaryEntries = [];
  userViewSettings = normalizeUserViewSettings(null);
}

function getFamilyQueryPart() {
  const family = getActiveFamily();
  return `family=${encodeURIComponent(family)}`;
}

function getUserStorageUrl(user = getActiveUser()) {
  return `${SERVER_STORAGE_URL}?${getFamilyQueryPart()}&user=${encodeURIComponent(user)}`;
}

function getSharedStorageUrl() {
  return `${SERVER_STORAGE_URL}?${getFamilyQueryPart()}&user=shared`;
}

function getSharedSyncUrl() {
  return `${SERVER_STORAGE_URL}?${getFamilyQueryPart()}&user=shared&sync=1`;
}

function getDiarySyncUrl(user = getActiveUser()) {
  return `${SERVER_STORAGE_URL}?${getFamilyQueryPart()}&user=${encodeURIComponent(user)}&sync=1`;
}

function getAirtableSyncIntervalMs() {
  const weeks = Math.max(0, Number(userSettings.syncWeeks) || 0);
  const days = Math.max(0, Number(userSettings.syncDays) || 0);
  const hours = Math.max(0, Number(userSettings.syncHours) || 0);
  const minutes = Math.max(0, Number(userSettings.syncMinutes) || 0);
  const totalMinutes = (weeks * 7 * 24 * 60) + (days * 24 * 60) + (hours * 60) + minutes;
  return totalMinutes > 0 ? totalMinutes * 60 * 1000 : 0;
}

function setSyncStatus(message, isError = false) {
  if (syncStatus) {
    syncStatus.textContent = message;
    syncStatus.classList.toggle("error", isError);
  }
  if (offlineStatus) {
    const isRelevant = /offline|oczekuje|synchroniz|internet/i.test(message);
    offlineStatus.textContent = isRelevant ? message : "";
    offlineStatus.classList.toggle("hidden", !isRelevant);
    offlineStatus.classList.toggle("error", isError);
  }
}

function setShopLoadingStatus(message = "", isError = false) {
  if (!shopLoadingStatus) {
    return;
  }
  shopLoadingStatus.textContent = message;
  shopLoadingStatus.classList.toggle("hidden", !message);
  shopLoadingStatus.classList.toggle("error", isError);
}

function setConnectionStatus(message, isActive = false, isError = false) {
  if (!airtableConnectionStatus) {
    return;
  }
  airtableConnectionStatus.textContent = `Połączenie z Airtable: ${message}`;
  airtableConnectionStatus.classList.toggle("error", isError);
  airtableConnectionStatus.classList.toggle("success", isActive);
}

function readSyncSettingsFromForm() {
  userSettings = normalizeSettings({
    ...userSettings,
    syncMode: syncModeSelect?.value || userSettings.syncMode,
    syncWeeks: syncWeeksInput?.value ?? userSettings.syncWeeks,
    syncDays: syncDaysInput?.value ?? userSettings.syncDays,
    syncHours: syncHoursInput?.value ?? userSettings.syncHours,
    syncMinutes: syncMinutesInput?.value ?? userSettings.syncMinutes,
  });
}

function fillSyncSettingsForm() {
  if (syncModeSelect) {
    syncModeSelect.value = userSettings.syncMode || "manual";
  }
  if (syncWeeksInput) syncWeeksInput.value = String(userSettings.syncWeeks ?? 0);
  if (syncDaysInput) syncDaysInput.value = String(userSettings.syncDays ?? 0);
  if (syncHoursInput) syncHoursInput.value = String(userSettings.syncHours ?? 0);
  if (syncMinutesInput) syncMinutesInput.value = String(userSettings.syncMinutes ?? 0);
}

function updateSyncTimer() {
  if (syncTimerId) {
    window.clearInterval(syncTimerId);
    syncTimerId = null;
  }

  const intervalMs = getAirtableSyncIntervalMs();
  if (userSettings.syncMode === "auto" && intervalMs > 0) {
    syncTimerId = window.setInterval(() => {
      void syncToAirtable();
    }, intervalMs);
    setSyncStatus(`Auto: co ${Math.round(intervalMs / 60000)} min`);
  } else if (userSettings.syncMode === "manual") {
    setSyncStatus("Tryb ręczny. Kliknij 'Wyślij teraz'.");
  } else {
    setSyncStatus("Ustaw interwał synchronizacji większy niż 0.", true);
  }
}

function refreshSyncSection() {
  fillSyncSettingsForm();
  updateSyncTimer();
  void checkAirtableConnection();
}

function setDataDirty() {
  dataDirty = true;
}

async function checkAirtableConnection() {
  if (!isAirtableConfigManager()) {
    setConnectionStatus("zarządzane przez administratora globalnego");
    return;
  }

  try {
    const response = await fetch(`${AIRTABLE_HEALTH_URL}?${getFamilyQueryPart()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await response.json();
    if (response.ok && payload.success && payload.connected) {
      setConnectionStatus("aktywne", true, false);
    } else if (response.ok && payload.success) {
      setConnectionStatus(payload.reason || "skonfigurowane, ale brak połączenia", false, true);
    } else {
      setConnectionStatus(payload.error || "nieaktywne", false, true);
    }
  } catch (error) {
    setConnectionStatus(`błąd: ${error.message}`, false, true);
  }
}

function scheduleSyncTimer() {
  updateSyncTimer();
}

async function syncToAirtable(force = false) {
  if (!force && !hasPendingSharedSync() && !hasPendingDiarySync()) {
    setSyncStatus("Brak nowych zmian do wysłania.");
    return;
  }
  setSyncStatus("Synchronizacja…");
  const synced = await trySyncPendingData();
  if (synced) {
    dataDirty = false;
    lastAirtableSyncAt = new Date();
    setSyncStatus(`Dane zsynchronizowane: ${lastAirtableSyncAt.toLocaleString("pl-PL")}`);
  }
}

function getAccountsUrl(user = getActiveUser()) {
  return `${ACCOUNTS_STORAGE_URL}?${getFamilyQueryPart()}&user=${encodeURIComponent(user)}`;
}

function isAdminUser() {
  return currentAccount?.isAdmin === true || localStorage.getItem("shoppingIsAdmin") === "true";
}

function isAirtableConfigManager() {
  return false;
}

function setSettingsSection(section = "user") {
  const canSeeAdmin = isAdminUser();
  activeSettingsSection = section === "admin" && canSeeAdmin ? "admin" : "user";
  const adminSelected = activeSettingsSection === "admin";
  userSettingsPanel?.classList.toggle("hidden", adminSelected);
  adminTools?.classList.toggle("hidden", !canSeeAdmin || !adminSelected);
  settingsUserTab?.classList.toggle("active", !adminSelected);
  settingsAdminTab?.classList.toggle("active", adminSelected);
  settingsUserTab?.setAttribute("aria-selected", adminSelected ? "false" : "true");
  settingsAdminTab?.setAttribute("aria-selected", adminSelected ? "true" : "false");
  if (settingsAdminTab) settingsAdminTab.disabled = !canSeeAdmin;
}

function setAdminVisibility() {
  if (!adminTools) {
    return;
  }

  const canSeeAdmin = isAdminUser();
  adminTools.classList.toggle("hidden", !canSeeAdmin);
  setSettingsSection(activeSettingsSection);

  const canManageAirtable = false;
  const airtableTab = document.getElementById("admin-tab-airtable");
  const syncTab = document.getElementById("admin-tab-sync");
  airtableTab?.classList.toggle("hidden", !canManageAirtable);
  syncTab?.classList.add("hidden");
  adminAirtablePanel?.classList.add("hidden");
  adminSyncPanel?.classList.add("hidden");
  if (activeAdminTab === "airtable" || activeAdminTab === "sync") {
    setActiveAdminTab("accounts");
  }
}

function setActiveAdminTab(tab) {
  activeAdminTab = ["airtable", "sync", "accounts", "products"].includes(tab) ? tab : "airtable";

  adminTabButtons.forEach((button) => {
    const isActive = button.dataset.adminTab === activeAdminTab;
    button.classList.toggle("active", isActive);
  });

  adminAirtablePanel?.classList.toggle("hidden", activeAdminTab !== "airtable");
  adminSyncPanel?.classList.toggle("hidden", activeAdminTab !== "sync");
  adminAccountsPanel?.classList.toggle("hidden", activeAdminTab !== "accounts");
  adminProductsPanel?.classList.toggle("hidden", activeAdminTab !== "products");

  if (activeAdminTab === "products") {
    renderProductsData();
  }
}

function setAccountsStatus(message, isError = false) {
  if (!accountsStatus) {
    return;
  }
  accountsStatus.textContent = message;
  accountsStatus.classList.toggle("error", isError);
}

function setProductsStatus(message, isError = false) {
  if (!productsStatus) {
    return;
  }
  productsStatus.textContent = message;
  productsStatus.classList.toggle("error", isError);
}

function setFamilyScreenError(message, isError = false) {
  if (!familyScreenError) {
    return;
  }
  familyScreenError.textContent = message;
  familyScreenError.classList.toggle("error", isError);
}

function setSuperAdminStatus(message, isError = false) {
  if (!superAdminStatus) {
    return;
  }
  superAdminStatus.textContent = message;
  superAdminStatus.classList.toggle("error", isError);
}

function setFamilyEditPasswordStatus(message, isError = false) {
  if (!familyEditPasswordStatus) return;
  familyEditPasswordStatus.textContent = message;
  familyEditPasswordStatus.classList.toggle("error", isError);
}

function setFamilyAdminPasswordOutcome(message, isError = false) {
  setFamilyEditPasswordStatus(message, isError);
  setSuperAdminStatus(message, isError);
}

function togglePasswordField(input, button) {
  if (!input || !button) return;
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  button.textContent = visible ? "Pokaż" : "Ukryj";
  button.setAttribute("aria-label", visible ? "Pokaż hasło" : "Ukryj hasło");
  button.setAttribute("aria-pressed", visible ? "false" : "true");
}

function setActiveSuperAdminTab(tab) {
  const active = ["families", "airtable", "sync", "security"].includes(tab) ? tab : "families";
  superAdminTabButtons.forEach((button) => {
    const selected = button.dataset.superAdminTab === active;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
    button.tabIndex = selected ? 0 : -1;
  });
  superAdminTabPanels.forEach((panel) => {
    const selected = panel.id === `super-admin-panel-${active}`;
    panel.classList.toggle("hidden", !selected);
    panel.hidden = !selected;
  });
}

function updateSuperAdminOverview() {
  if (superAdminFamilyCount) superAdminFamilyCount.textContent = String(Array.isArray(families) ? families.length : 0);
}

function closeFamilyEditModal() {
  editingFamilySlug = "";
  if (familyEditAdminTargetSelect) {
    familyEditAdminTargetSelect.innerHTML = "<option value=\"\">Wybierz administratora</option>";
    familyEditAdminTargetSelect.disabled = true;
  }
  if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = true;
  if (familyEditAdminPasswordInput) familyEditAdminPasswordInput.type = "password";
  if (familyEditAdminPasswordConfirmInput) familyEditAdminPasswordConfirmInput.type = "password";
  if (familyEditAdminPasswordToggle) { familyEditAdminPasswordToggle.textContent = "Pokaż"; familyEditAdminPasswordToggle.setAttribute("aria-pressed", "false"); }
  if (familyEditAdminPasswordConfirmToggle) { familyEditAdminPasswordConfirmToggle.textContent = "Pokaż"; familyEditAdminPasswordConfirmToggle.setAttribute("aria-pressed", "false"); }
  setFamilyEditPasswordStatus("");
  familyEditModal?.classList.add("hidden");
}

async function loadFamilyAdminTargets(familySlug, preferredUsername = "") {
  if (!familyEditAdminTargetSelect) return;
  familyEditAdminTargetSelect.disabled = true;
  if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = true;
  familyEditAdminTargetSelect.innerHTML = "<option value=\"\">Wczytywanie administratorów…</option>";
  setFamilyAdminPasswordOutcome("Wczytywanie administratorów rodziny…");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "get_family_admins", familySlug }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      const error = new Error(payload.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.code = payload.errorCode || "get_family_admins_failed";
      throw error;
    }
    const admins = Array.isArray(payload.admins) ? payload.admins : [];
    familyEditAdminTargetSelect.innerHTML = "";
    admins.forEach((admin) => {
      const option = document.createElement("option");
      option.value = admin.username || "";
      option.textContent = admin.displayName ? `${admin.username} (${admin.displayName})` : admin.username;
      familyEditAdminTargetSelect.appendChild(option);
    });
    if (preferredUsername && admins.some((admin) => admin.username === preferredUsername)) {
      familyEditAdminTargetSelect.value = preferredUsername;
    }
    familyEditAdminTargetSelect.disabled = admins.length === 0;
    if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = admins.length === 0;
    if (admins.length === 0) {
      setFamilyAdminPasswordOutcome("Nie znaleziono administratorów tej rodziny.", true);
    } else {
      setFamilyAdminPasswordOutcome(`Wczytano administratora: ${familyEditAdminTargetSelect.value || admins[0].username}.`);
    }
  } catch (error) {
    familyEditAdminTargetSelect.innerHTML = "<option value=\"\">Nie udało się wczytać administratorów</option>";
    familyEditAdminTargetSelect.disabled = true;
    if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = true;
    const status = Number(error?.status || 0);
    const message = status === 401 || status === 403
      ? "Sesja superadmina wygasła lub nie ma uprawnień. Zaloguj się ponownie."
      : (error?.message || "Nie udało się wczytać administratorów.");
    const code = error?.code ? ` [${error.code}]` : "";
    setFamilyAdminPasswordOutcome(`Nie można wczytać administratorów: ${message}${code} (HTTP ${status || "?"}).`, true);
  }
}

async function openFamilyEditModal(family) {
  editingFamilySlug = normalizeFamilySlug(family?.slug || "");
  if (!editingFamilySlug) {
    setSuperAdminStatus("Nie udało się otworzyć edycji rodziny.", true);
    return;
  }

  if (familyEditNameInput) {
    familyEditNameInput.value = family?.name || "";
  }
  if (familyEditAdminUsernameInput) {
    familyEditAdminUsernameInput.value = family?.adminUsername || "";
  }
  if (familyEditAdminDisplayInput) {
    familyEditAdminDisplayInput.value = family?.adminDisplayName || "";
  }
  if (familyEditAdminPasswordInput) familyEditAdminPasswordInput.value = "";
  if (familyEditAdminPasswordConfirmInput) familyEditAdminPasswordConfirmInput.value = "";
  setFamilyEditPasswordStatus("");

  familyEditModal?.classList.remove("hidden");
  await loadFamilyAdminTargets(editingFamilySlug, family?.adminUsername || "");
}

function renderSuperAdminFamilyList() {
  if (!superAdminFamilyList) {
    return;
  }

  superAdminFamilyList.innerHTML = "";
  if (!Array.isArray(families) || families.length === 0) {
    superAdminFamilyList.innerHTML = "<p>Brak rodzin.</p>";
    updateSuperAdminOverview();
    return;
  }

  families.forEach((family) => {
    const row = document.createElement("div");
    row.className = "family-list-row";
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    const info = document.createElement("div");
    const title = document.createElement("div");
    title.className = "item-name-text";
    title.textContent = family.name || family.slug || "";
    const meta = document.createElement("div");
    meta.className = "family-list-meta";
    const adminUser = family.adminUsername || "-";
    const adminDisplay = family.adminDisplayName ? ` (${family.adminDisplayName})` : "";
    meta.textContent = `Admin: ${adminUser}${adminDisplay}`;
    info.appendChild(title);
    info.appendChild(meta);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "secondary small";
    editButton.textContent = "Edytuj";
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openFamilyEditModal(family);
    });

    row.addEventListener("click", () => {
      openFamilyEditModal(family);
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFamilyEditModal(family);
      }
    });

    row.appendChild(info);
    row.appendChild(editButton);
    superAdminFamilyList.appendChild(row);
  });
  updateSuperAdminOverview();
}

function renderFamilySelectOptions() {
  if (!familySelect) {
    return;
  }
  familySelect.innerHTML = "";

  if (!Array.isArray(families) || families.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Brak rodzin - utwórz rodzinę przez Admin";
    familySelect.appendChild(option);
    return;
  }

  families.forEach((family) => {
    const option = document.createElement("option");
    option.value = normalizeFamilySlug(family.slug || "");
    option.textContent = family.name || family.slug || "";
    familySelect.appendChild(option);
  });

  const active = getActiveFamily() || serverLastSelectedFamily;
  if (active) {
    familySelect.value = active;
  } else if (families.length > 0) {
    familySelect.value = normalizeFamilySlug(families[0].slug || "");
  }
}

async function loadFamilies() {
  setFamilyScreenError("Wczytywanie rodzin...");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }
    families = Array.isArray(payload.families) ? payload.families : [];
    serverLastSelectedFamily = normalizeFamilySlug(payload.lastSelectedFamily || "");
    renderFamilySelectOptions();
    renderSuperAdminFamilyList();
    setFamilyScreenError(families.length > 0 ? "" : "Brak rodzin. Użyj przycisku Admin, aby dodać pierwszą rodzinę.", families.length === 0);
  } catch (error) {
    setFamilyScreenError(`Błąd wczytywania rodzin: ${error.message}`, true);
  }
}

function showFamilyScreen() {
  closeFamilyEditModal();
  familyScreen?.classList.remove("hidden");
  superAdminScreen?.classList.add("hidden");
  loginScreen.classList.add("hidden");
  shopScreen.classList.add("hidden");
}

function showSuperAdminScreen() {
  closeFamilyEditModal();
  familyScreen?.classList.add("hidden");
  superAdminScreen?.classList.remove("hidden");
  loginScreen.classList.add("hidden");
  shopScreen.classList.add("hidden");
  superAdminAuthorized = false;
  superAdminLoginBox?.classList.remove("hidden");
  superAdminPanel?.classList.add("hidden");
  setActiveSuperAdminTab("families");
  setSuperAdminStatus("");
}

function updateLoginFamilyLabel() {
  if (!loginFamilyLabel) {
    return;
  }
  const family = getActiveFamily();
  if (!family) {
    loginFamilyLabel.textContent = "";
    return;
  }
  loginFamilyLabel.textContent = `Wybrana rodzina: ${getFamilyDisplayName(family)}`;
}

async function continueWithFamilySelection() {
  const family = normalizeFamilySlug(familySelect?.value || "");
  if (!family) {
    setFamilyScreenError("Wybierz rodzinę z listy.", true);
    return;
  }

  setSelectedFamily(family);
  try {
    await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "set_last_selected_family", familySlug: family }),
    });
    serverLastSelectedFamily = family;
  } catch {
    // Selection should still work locally if saving default family fails.
  }
  clearAuthSession();
  updateLoginFamilyLabel();
  showLoginScreen();
}

async function loginSuperAdmin() {
  const password = (superAdminPasswordInput?.value || "").trim();
  if (!password) {
    setSuperAdminStatus("Podaj hasło administratora globalnego.", true);
    return;
  }

  setSuperAdminStatus("Logowanie...");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "super_admin_login", password }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || "Błąd logowania super-admina.");
    }

    superAdminAuthorized = true;
    superAdminLoginBox?.classList.add("hidden");
    superAdminPanel?.classList.remove("hidden");
    setActiveSuperAdminTab("families");
    setSuperAdminStatus("Zalogowano do panelu administratora globalnego.");
    renderSuperAdminFamilyList();
    await loadSuperAdminAirtableConfig();
    await loadSuperAdminSyncSettings();
  } catch (error) {
    setSuperAdminStatus(error.message || "Błąd logowania super-admina.", true);
  }
}

async function createFamily() {
  if (!superAdminAuthorized) {
    setSuperAdminStatus("Najpierw zaloguj się do panelu super-admina.", true);
    return;
  }

  const familyName = (newFamilyNameInput?.value || "").trim();
  const adminUsername = (newFamilyAdminUsernameInput?.value || "").trim();
  const adminPassword = (newFamilyAdminPasswordInput?.value || "").trim();
  const adminDisplayName = (newFamilyAdminDisplayInput?.value || "").trim();

  if (!familyName || !adminUsername || !adminPassword) {
    setSuperAdminStatus("Podaj nazwę rodziny, login i hasło pierwszego administratora.", true);
    return;
  }

  setSuperAdminStatus("Tworzenie rodziny...");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({
        action: "create_family",
        familyName,
        adminUsername,
        adminPassword,
        adminDisplayName,
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    setSuperAdminStatus("Rodzina została utworzona.");
    if (newFamilyNameInput) newFamilyNameInput.value = "";
    if (newFamilyAdminUsernameInput) newFamilyAdminUsernameInput.value = "";
    if (newFamilyAdminPasswordInput) newFamilyAdminPasswordInput.value = "";
    if (newFamilyAdminDisplayInput) newFamilyAdminDisplayInput.value = "";
    await loadFamilies();
  } catch (error) {
    setSuperAdminStatus(`Błąd tworzenia rodziny: ${error.message}`, true);
  }
}

async function saveFamilyEdit() {
  if (!superAdminAuthorized) {
    setSuperAdminStatus("Najpierw zaloguj się do panelu super-admina.", true);
    return;
  }

  const familySlug = normalizeFamilySlug(editingFamilySlug);
  const familyName = (familyEditNameInput?.value || "").trim();
  const adminUsername = (familyEditAdminUsernameInput?.value || "").trim();
  const adminDisplayName = (familyEditAdminDisplayInput?.value || "").trim();

  if (!familySlug || !familyName || !adminUsername) {
    setSuperAdminStatus("Podaj nazwę rodziny i login administratora.", true);
    return;
  }

  setSuperAdminStatus("Zapisywanie zmian rodziny...");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({
        action: "update_family",
        familySlug,
        familyName,
        adminUsername,
        adminDisplayName,
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    const previousSelectedFamily = getActiveFamily();
    const updatedSlug = normalizeFamilySlug(payload.family?.slug || familySlug);
    if (normalizeFamilySlug(previousSelectedFamily) === familySlug) {
      setSelectedFamily(updatedSlug);
      localStorage.setItem(getSessionFamilyKey(), updatedSlug);
      updateLoginFamilyLabel();
    }

    await loadFamilies();
    closeFamilyEditModal();
    setSuperAdminStatus("Dane rodziny zostały zaktualizowane.");
  } catch (error) {
    setSuperAdminStatus(`Błąd aktualizacji rodziny: ${error.message}`, true);
  }
}

async function changeSuperAdminPassword() {
  if (!superAdminAuthorized) {
    setSuperAdminStatus("Najpierw zaloguj się do panelu super-admina.", true);
    return;
  }

  const oldPassword = (superAdminOldPasswordInput?.value || "").trim();
  const newPassword = (superAdminNewPasswordInput?.value || "").trim();
  if (!oldPassword || !newPassword) {
    setSuperAdminStatus("Podaj obecne i nowe hasło administratora globalnego.", true);
    return;
  }
  if (!validateNewPassword(newPassword)) {
    setSuperAdminStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);
    return;
  }

  setSuperAdminStatus("Zmiana hasła...");
  try {
    const response = await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "change_super_admin_password", oldPassword, newPassword }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    if (superAdminPasswordInput) {
      superAdminPasswordInput.value = newPassword;
    }
    if (superAdminOldPasswordInput) {
      superAdminOldPasswordInput.value = "";
    }
    if (superAdminNewPasswordInput) {
      superAdminNewPasswordInput.value = "";
    }
    setSuperAdminStatus("Hasło administratora globalnego zostało zmienione.");
  } catch (error) {
    setSuperAdminStatus(`Błąd zmiany hasła: ${error.message}`, true);
  }
}

function renderProductsData() {
  if (!productsDataList) {
    return;
  }

  const shoppingProductsWithApiData = items
    .filter((item) => item?.nutrition && typeof item.nutrition === "object")
    .map((item) => ({
      scope: "Lista produktów",
      id: item.id ?? null,
      name: item.name ?? "",
      quantity: item.quantity ?? null,
      unit: item.unit ?? "",
      date: null,
      bought: item.bought === true,
      selected: item.selected === true,
      nutrition: item.nutrition,
      nutritionSource: item.nutritionSource ?? null,
      nutritionError: item.nutritionError ?? null,
    }));

  const diaryProductsWithApiData = diaryEntries
    .filter((entry) => entry?.nutrition && typeof entry.nutrition === "object")
    .map((entry) => ({
      scope: "Moja dieta",
      id: entry.id ?? null,
      name: entry.name ?? "",
      quantity: entry.quantity ?? null,
      unit: entry.unit ?? "",
      date: entry.date ?? null,
      bought: null,
      selected: null,
      nutrition: entry.nutrition,
      nutritionSource: entry.nutritionSource ?? null,
      nutritionError: entry.nutritionError ?? null,
    }));

  const productsWithApiData = [...shoppingProductsWithApiData, ...diaryProductsWithApiData];
  productsDataList.innerHTML = "";

  if (productsWithApiData.length === 0) {
    setProductsStatus("Brak produktów z pobranymi danymi API.");
    productsDataList.innerHTML = "<p>Najpierw pobierz makro dla produktów na liście lub wpisów w Mojej diecie.</p>";
    return;
  }

  setProductsStatus(`Znaleziono produktów z danymi API: ${productsWithApiData.length}.`);

  productsWithApiData.forEach((product) => {
    const row = document.createElement("div");
    row.className = "item-row";

    const info = document.createElement("div");
    info.className = "item-name";

    const title = document.createElement("div");
    title.className = "item-name-text";
    title.textContent = product.name || "-";

    const meta = document.createElement("div");
    meta.className = "item-name-meta";
    const quantityText = Number.isFinite(Number(product.quantity))
      ? `${formatQuantity(Number(product.quantity))} ${product.unit || ""}`
      : "brak ilości";
    const dateText = product.date ? ` • Data: ${product.date}` : "";
    meta.textContent = `${product.scope} • Ilość: ${quantityText}${dateText}`;

    const payloadView = document.createElement("pre");
    payloadView.className = "product-data-json";
    payloadView.textContent = JSON.stringify(
      product,
      null,
      2
    );

    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(payloadView);

    row.appendChild(info);
    productsDataList.appendChild(row);
  });
}

function normalizeAccountUsername(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderAccounts(accounts) {
  if (!accountsList) {
    return;
  }

  accountsList.innerHTML = "";
  if (!Array.isArray(accounts) || accounts.length === 0) {
    accountsList.innerHTML = "<p>Brak kont użytkowników. Utwórz pierwsze konto.</p>";
    return;
  }

  accounts.forEach((account) => {
    const row = document.createElement("div");
    row.className = "item-row account-row";

    const info = document.createElement("div");
    info.className = "item-name";
    const title = document.createElement("div");
    title.className = "item-name-text";
    title.textContent = `${account.username || "-"} (${account.displayName || "brak nazwy"})`;
    const meta = document.createElement("div");
    meta.className = "item-name-meta";
    const parts = [];
    if (account.note) {
      parts.push(account.note);
    }
    if (account.isAdmin) {
      parts.push("admin");
    }
    meta.textContent = parts.join(" • ");
    info.appendChild(title);
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "item-qty account-actions";

    const passwordButton = document.createElement("button");
    passwordButton.type = "button";
    passwordButton.className = "item-nutrition-button";
    passwordButton.title = "Zmień hasło";
    passwordButton.textContent = "⌁";
    passwordButton.addEventListener("click", () => {
      void setPasswordFromAccountRow(account);
    });
    actions.appendChild(passwordButton);

    const isPrimaryAdmin = account.username === primaryFamilyAdminUsername;
    if (canManageFamilyAdmins && !isPrimaryAdmin) {
      const adminButton = document.createElement("button");
      adminButton.type = "button";
      adminButton.className = "item-view-button";
      adminButton.title = account.isAdmin ? "Odbierz uprawnienia administratora" : "Nadaj uprawnienia administratora";
      adminButton.textContent = account.isAdmin ? "★" : "☆";
      adminButton.addEventListener("click", () => {
        void setAccountAdminFromRow(account, account.isAdmin !== true);
      });
      actions.appendChild(adminButton);
    }

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "item-view-button";
    editButton.title = "Edytuj konto";
    editButton.textContent = "✎";
    editButton.addEventListener("click", () => {
      void editAccountFromRow(account);
    });
    actions.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "item-delete-button";
    deleteButton.title = "Usuń konto";
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", () => {
      void deleteAccountFromRow(account);
    });
    actions.appendChild(deleteButton);

    row.appendChild(info);
    row.appendChild(actions);
    accountsList.appendChild(row);
  });
}

async function setAccountAdminFromRow(account, nextIsAdmin) {
  const username = normalizeAccountUsername(account?.username || "");
  const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");

  if (!canManageFamilyAdmins) {
    setAccountsStatus("Tylko pierwszy administrator rodziny może nadawać uprawnienia.", true);
    return;
  }
  if (!username) {
    setAccountsStatus("Brak poprawnego loginu konta.", true);
    return;
  }
  if (username === activeUsername && nextIsAdmin === false) {
    setAccountsStatus("Nie możesz odebrać sobie roli administratora w tej sesji.", true);
    return;
  }

  const actionLabel = nextIsAdmin ? "nadać" : "odebrać";
  const accepted = window.confirm(`Czy na pewno ${actionLabel} uprawnienia administratora dla konta ${username}?`);
  if (!accepted) {
    return;
  }

  setAccountsStatus(`${nextIsAdmin ? "Nadawanie" : "Odbieranie"} uprawnień administratora...`);
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_admin", username, isAdmin: nextIsAdmin }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    if (username === activeUsername && currentAccount) {
      currentAccount = {
        ...currentAccount,
        isAdmin: nextIsAdmin,
      };
      localStorage.setItem("shoppingIsAdmin", nextIsAdmin ? "true" : "false");
      if (!nextIsAdmin) {
        localStorage.removeItem("shoppingAdminPassword");
      }
      setAdminVisibility();
    }

    renderAccounts(payload.accounts || []);
    setAccountsStatus(
      nextIsAdmin
        ? `Konto ${username} ma teraz uprawnienia administratora.`
        : `Konto ${username} nie ma już uprawnień administratora.`
    );
  } catch (error) {
    setAccountsStatus(`Błąd zmiany uprawnień: ${error.message}`, true);
  }
}

async function setPasswordFromAccountRow(account) {
  const username = normalizeAccountUsername(account?.username || "");
  if (!username) {
    setAccountsStatus("Brak poprawnego loginu konta.", true);
    return;
  }

  const newPassword = window.prompt(`Nowe hasło dla ${username}:`, "");
  if (newPassword == null) {
    return;
  }
  const normalizedPassword = newPassword.trim();
  if (!validateNewPassword(normalizedPassword)) {
    setAccountsStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);
    return;
  }

  setAccountsStatus(`Zmiana hasła dla ${username}...`);
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_password", username, password: normalizedPassword }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");
    if (username === activeUsername) {
      localStorage.removeItem("shoppingAdminPassword");
    }

    renderAccounts(payload.accounts || []);
    setAccountsStatus(`Hasło konta ${username} zostało zmienione.`);
  } catch (error) {
    setAccountsStatus(`Błąd zmiany hasła: ${error.message}`, true);
  }
}

async function editAccountFromRow(account) {
  const username = normalizeAccountUsername(account?.username || "");
  if (!username) {
    setAccountsStatus("Brak poprawnego loginu konta.", true);
    return;
  }
  editingAccountUsername = username;
  if (accountEditUsernameInput) accountEditUsernameInput.value = username;
  if (accountEditDisplayNameInput) accountEditDisplayNameInput.value = account?.displayName || "";
  if (accountEditNoteInput) accountEditNoteInput.value = account?.note || "";
  if (accountEditIsAdminCheckbox) {
    accountEditIsAdminCheckbox.checked = account?.isAdmin === true;
    accountEditIsAdminCheckbox.disabled = !canManageFamilyAdmins || username === primaryFamilyAdminUsername;
  }
  if (accountEditPasswordInput) accountEditPasswordInput.value = "";
  if (accountEditPasswordConfirmInput) accountEditPasswordConfirmInput.value = "";
  accountEditModal?.classList.remove("hidden");
}

function closeAccountEditModal() {
  editingAccountUsername = "";
  accountEditModal?.classList.add("hidden");
}

function validateNewPassword(password) {
  return password.length >= 8 && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
}

async function saveAccountEdit() {
  const username = normalizeAccountUsername(editingAccountUsername || accountEditUsernameInput?.value || "");
  const displayName = (accountEditDisplayNameInput?.value || "").trim();
  const note = (accountEditNoteInput?.value || "").trim();
  const isAdmin = accountEditIsAdminCheckbox?.checked === true;
  const password = (accountEditPasswordInput?.value || "").trim();
  const passwordConfirm = (accountEditPasswordConfirmInput?.value || "").trim();
  const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");

  if (!username) return setAccountsStatus("Brak poprawnego loginu konta.", true);
  if (username === activeUsername && !isAdmin) return setAccountsStatus("Nie możesz odebrać sobie roli administratora w tej sesji.", true);
  if (password || passwordConfirm) {
    if (password !== passwordConfirm) return setAccountsStatus("Hasła nie są identyczne.", true);
    if (!validateNewPassword(password)) return setAccountsStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);
  }

  setAccountsStatus(`Zapisywanie zmian konta ${username}...`);
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "edit_account",
        username,
        displayName,
        note,
        isAdmin,
        password,
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");
    if (username === activeUsername) {
      currentAccount = {
        ...currentAccount,
        displayName,
        isAdmin,
      };
      localStorage.setItem("shoppingDisplayName", displayName);
      localStorage.setItem("shoppingIsAdmin", isAdmin ? "true" : "false");
    }

    renderAccounts(payload.accounts || []);
    closeAccountEditModal();
    setAccountsStatus(`Konto ${username} zostało zaktualizowane.`);
  } catch (error) {
    setAccountsStatus(`Błąd edycji konta: ${error.message}`, true);
  }
}

async function deleteAccountFromRow(account) {
  const username = normalizeAccountUsername(account?.username || "");
  const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");

  if (!username) {
    setAccountsStatus("Brak poprawnego loginu konta.", true);
    return;
  }
  if (username === activeUsername) {
    setAccountsStatus("Nie możesz usunąć aktualnie zalogowanego konta.", true);
    return;
  }

  const accepted = window.confirm(`Czy na pewno usunąć konto ${username}?`);
  if (!accepted) {
    return;
  }

  setAccountsStatus(`Usuwanie konta ${username}...`);
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_account", username }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    renderAccounts(payload.accounts || []);
    setAccountsStatus(`Konto ${username} zostało usunięte.`);
  } catch (error) {
    setAccountsStatus(`Błąd usuwania konta: ${error.message}`, true);
  }
}

async function loadAccounts() {
  if (!isAdminUser()) {
    setAccountsStatus("Brak dostępu do kont. Zaloguj się hasłem konta administratora.", true);
    return;
  }

  setAccountsStatus("Wczytywanie kont...");
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }
    canManageFamilyAdmins = payload.canManageAdmins === true;
    primaryFamilyAdminUsername = String(payload.primaryAdminUsername || "");
    renderAccounts(payload.accounts || []);
    setAccountsStatus("Konta zostały wczytane.");
  } catch (error) {
    setAccountsStatus(`Błąd wczytywania kont: ${error.message}`, true);
  }
}

async function createAccount() {
  if (!isAdminUser()) {
    setAccountsStatus("Brak dostępu do tworzenia kont. Zaloguj się hasłem konta administratora.", true);
    return;
  }

  const username = normalizeAccountUsername(accountUsernameInput?.value || "");
  const password = (accountPasswordInput?.value || "").trim();
  const displayName = (accountDisplayNameInput?.value || "").trim();
  const note = (accountNoteInput?.value || "").trim();

  if (!username) {
    setAccountsStatus("Podaj poprawny login użytkownika.", true);
    return;
  }
  if (!validateNewPassword(password)) {
    setAccountsStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);
    return;
  }

  setAccountsStatus("Tworzenie konta...");
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, displayName, note }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    if (accountUsernameInput) {
      accountUsernameInput.value = "";
    }
    if (accountPasswordInput) {
      accountPasswordInput.value = "";
    }
    if (accountDisplayNameInput) {
      accountDisplayNameInput.value = "";
    }
    if (accountNoteInput) {
      accountNoteInput.value = "";
    }

    renderAccounts(payload.accounts || []);
    setAccountsStatus("Konto zostało utworzone.");
  } catch (error) {
    setAccountsStatus(`Błąd tworzenia konta: ${error.message}`, true);
  }
}

async function setAccountPassword() {
  if (!isAdminUser()) {
    setAccountsStatus("Brak dostępu do zmiany hasła. Zaloguj się hasłem konta administratora.", true);
    return;
  }

  const username = normalizeAccountUsername(accountUsernameInput?.value || "");
  const newPassword = (accountNewPasswordInput?.value || "").trim();
  const activeUsername = normalizeAccountUsername(currentAccount?.username || currentUser || "");

  if (!username) {
    setAccountsStatus("Podaj poprawny login użytkownika.", true);
    return;
  }
  if (!validateNewPassword(newPassword)) {
    setAccountsStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);
    return;
  }

  setAccountsStatus("Ustawianie nowego hasła...");
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_password", username, password: newPassword }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || `HTTP ${response.status}`);
    }

    if (accountNewPasswordInput) {
      accountNewPasswordInput.value = "";
    }

    if (username && username === activeUsername) {
      localStorage.removeItem("shoppingAdminPassword");
    }

    renderAccounts(payload.accounts || []);
    setAccountsStatus("Hasło użytkownika zostało zaktualizowane.");
  } catch (error) {
    setAccountsStatus(`Błąd zmiany hasła: ${error.message}`, true);
  }
}

async function loadAirtableConfig() {
  if (isAirtableConfigManager()) await checkAirtableConnection();
}

function setOwnPasswordStatus(message, isError = false) {
  if (!ownPasswordStatus) return;
  ownPasswordStatus.textContent = message;
  ownPasswordStatus.classList.toggle("error", isError);
}

async function changeOwnPassword() {
  const currentPassword = (ownCurrentPasswordInput?.value || "").trim();
  const newPassword = (ownNewPasswordInput?.value || "").trim();
  const confirmation = (ownNewPasswordConfirmInput?.value || "").trim();
  if (!currentPassword) return setOwnPasswordStatus("Podaj obecne hasło.", true);
  if (newPassword !== confirmation) return setOwnPasswordStatus("Hasła nie są identyczne.", true);
  if (!validateNewPassword(newPassword)) return setOwnPasswordStatus("Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true);

  setOwnPasswordStatus("Zapisywanie nowego hasła...");
  try {
    const response = await fetch(getAccountsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "change_own_password", currentPassword, password: newPassword }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    if (ownCurrentPasswordInput) ownCurrentPasswordInput.value = "";
    if (ownNewPasswordInput) ownNewPasswordInput.value = "";
    if (ownNewPasswordConfirmInput) ownNewPasswordConfirmInput.value = "";
    setOwnPasswordStatus("Hasło zostało zmienione.");
  } catch (error) {
    setOwnPasswordStatus(`Błąd zmiany hasła: ${error.message}`, true);
  }
}

async function logoutSuperAdmin() {
  try {
    await fetch(FAMILIES_STORAGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "super_admin_logout" }),
    });
  } catch {
    // The local state is cleared even when the network is unavailable.
  }
  superAdminAuthorized = false;
  if (superAdminPasswordInput) superAdminPasswordInput.value = "";
  showFamilyScreen();
}

async function setFamilyAdminPassword() {
  if (!superAdminAuthorized || !editingFamilySlug) {
    setFamilyAdminPasswordOutcome("Sesja superadmina wygasła. Zaloguj się ponownie.", true);
    return;
  }
  setFamilyAdminPasswordOutcome("Rozpoczęto reset hasła administratora…");
  const username = familyEditAdminTargetSelect?.value || "";
  const password = (familyEditAdminPasswordInput?.value || "").trim();
  const confirmation = (familyEditAdminPasswordConfirmInput?.value || "").trim();
  if (!username) { setFamilyAdminPasswordOutcome("Hasło nie zostało zmienione: wybierz administratora rodziny.", true); return; }
  if (!validateNewPassword(password)) { setFamilyAdminPasswordOutcome("Hasło nie zostało zmienione: hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.", true); return; }
  if (password !== confirmation) { setFamilyAdminPasswordOutcome("Hasło nie zostało zmienione: hasła nie są identyczne.", true); return; }
  if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = true;
  setFamilyAdminPasswordOutcome("Sprawdzanie sesji i zapisywanie nowego hasła…");
  try {
    const sessionCheck = await fetch(FAMILIES_STORAGE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({ action: "super_admin_status" }) });
    let sessionPayload = {};
    try { sessionPayload = await sessionCheck.json(); } catch { sessionPayload = {}; }
    if (!sessionCheck.ok || !sessionPayload.success) {
      const error = new Error(sessionPayload.error || `HTTP ${sessionCheck.status}`);
      error.status = sessionCheck.status;
      error.code = sessionPayload.errorCode || "session_check_failed";
      throw error;
    }
    if (sessionPayload.authenticated !== true || sessionPayload.role !== "super_admin") {
      const error = new Error("Sesja nie ma uprawnień administratora globalnego.");
      error.status = 403;
      error.code = "super_admin_session_required";
      throw error;
    }
    setFamilyAdminPasswordOutcome("Sesja superadmina potwierdzona. Sprawdzanie administratora…");
    const adminCheck = await fetch(FAMILIES_STORAGE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({ action: "get_family_admins", familySlug: editingFamilySlug }) });
    let adminPayload = {};
    try { adminPayload = await adminCheck.json(); } catch { adminPayload = {}; }
    if (!adminCheck.ok || !adminPayload.success) {
      const error = new Error(adminPayload.error || `HTTP ${adminCheck.status}`);
      error.status = adminCheck.status;
      error.code = adminPayload.errorCode || "admin_check_failed";
      throw error;
    }
    if (!Array.isArray(adminPayload.admins) || !adminPayload.admins.some((admin) => normalizeAccountUsername(admin.username || "") === normalizeAccountUsername(username))) {
      const error = new Error("Wybrany administrator nie jest już dostępny w tej rodzinie.");
      error.code = "admin_not_found";
      throw error;
    }
    setFamilyAdminPasswordOutcome("Administrator potwierdzony. Zapisywanie i weryfikacja hasła…");
    const response = await fetch(FAMILIES_STORAGE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({ action: "set_family_admin_password", familySlug: editingFamilySlug, username, password }) });
    let payload = {};
    try { payload = await response.json(); } catch { payload = {}; }
    if (!response.ok || !payload.success) {
      const error = new Error(payload.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.code = payload.errorCode || "reset_failed";
      error.stage = payload.stage || "unknown";
      error.requestId = payload.requestId || "";
      throw error;
    }
    if (payload.passwordVerified !== true || payload.accountRateLimitCleared !== true) {
      throw new Error("Serwer nie potwierdził pełnego resetu hasła i blokady logowania.");
    }
    if (familyEditAdminPasswordInput) familyEditAdminPasswordInput.value = "";
    if (familyEditAdminPasswordConfirmInput) familyEditAdminPasswordConfirmInput.value = "";
    const target = `${editingFamilySlug}/${payload.username || username}`;
    const successMessage = `Hasło administratora ${target} zostało zmienione i zweryfikowane. Można się teraz zalogować nowym hasłem.`;
    setFamilyAdminPasswordOutcome(successMessage);
  } catch (error) {
    const status = Number(error?.status || 0);
    const message = status === 429
      ? "Blokada logowania po adresie IP jest nadal aktywna. Odczekaj i spróbuj ponownie."
      : (status === 401 || status === 403)
        ? "Sesja superadmina wygasła lub nie ma uprawnień. Zaloguj się ponownie."
        : (error?.message || "Nie udało się zmienić hasła.");
    const code = error?.code ? ` [${error.code}]` : "";
    const requestId = error?.requestId ? ` Identyfikator: ${error.requestId}.` : "";
    const stage = error?.stage ? ` Etap: ${error.stage}.` : "";
    setFamilyAdminPasswordOutcome(`Hasło nie zostało zmienione: ${message}${code} (HTTP ${status || "?"}).${stage}${requestId}`, true);
  } finally {
    if (familyEditPasswordSaveButton) familyEditPasswordSaveButton.disabled = false;
  }
}

function setSuperAdminAirtableMessage(message, isError = false) {
  if (!superAdminAirtableStatus) return;
  superAdminAirtableStatus.textContent = message;
  superAdminAirtableStatus.classList.toggle("error", isError);
  if (superAdminAirtableSummary) superAdminAirtableSummary.textContent = isError ? "Błąd" : (message.includes("działa") || message.includes("ustawiona") ? "Gotowe" : "Sprawdzanie…");
}

function setSuperAdminSyncMessage(message, isError = false) {
  if (!superAdminSyncStatus) return;
  superAdminSyncStatus.textContent = message;
  superAdminSyncStatus.classList.toggle("error", isError);
  if (superAdminSyncSummary) superAdminSyncSummary.textContent = isError ? "Błąd" : (message.includes("zapisany") || message.includes("wczytany") || message.includes("Zsynchronizowano") ? "Gotowe" : "Sprawdzanie…");
}

function renderSuperAdminSyncFamilies() {
  if (!superAdminSyncFamily) return;
  const selected = superAdminSyncFamily.value;
  superAdminSyncFamily.innerHTML = "";
  families.forEach((family) => {
    const option = document.createElement("option");
    option.value = normalizeFamilySlug(family.slug || "");
    option.textContent = family.name || family.slug || "";
    superAdminSyncFamily.appendChild(option);
  });
  if (selected && [...superAdminSyncFamily.options].some((option) => option.value === selected)) superAdminSyncFamily.value = selected;
}

async function loadSuperAdminAirtableConfig() {
  if (!superAdminAuthorized) return;
  setSuperAdminAirtableMessage("Wczytywanie konfiguracji…");
  try {
     const response = await fetch("api/airtable-settings.php", { headers: { Accept: "application/json" }, credentials: "same-origin", cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    const config = payload.config || {};
    if (superAdminAirtableBaseIdInput) superAdminAirtableBaseIdInput.value = config.base_id || "";
    if (superAdminAirtableTableNameInput) superAdminAirtableTableNameInput.value = config.table_name || "shopping_list";
    if (superAdminAirtableUserFieldInput) superAdminAirtableUserFieldInput.value = config.user_field || "user";
    if (superAdminAirtableDataFieldInput) superAdminAirtableDataFieldInput.value = config.data_field || "data";
    if (superAdminAirtableUpdatedFieldInput) superAdminAirtableUpdatedFieldInput.value = config.updated_field || "updated_at";
    setSuperAdminAirtableMessage(config.has_api_key ? "Konfiguracja Airtable jest ustawiona." : "Brak tokenu Airtable.");
  } catch (error) { setSuperAdminAirtableMessage(`Błąd konfiguracji: ${error.message}`, true); }
}

async function saveSuperAdminAirtableConfig() {
  if (!superAdminAuthorized) return;
  setSuperAdminAirtableMessage("Zapisywanie konfiguracji…");
  try {
     const response = await fetch("api/airtable-settings.php", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({
      api_key: superAdminAirtableApiKeyInput?.value.trim() || "", base_id: superAdminAirtableBaseIdInput?.value.trim() || "",
      table_name: superAdminAirtableTableNameInput?.value.trim() || "shopping_list", user_field: superAdminAirtableUserFieldInput?.value.trim() || "user",
      data_field: superAdminAirtableDataFieldInput?.value.trim() || "data", updated_field: superAdminAirtableUpdatedFieldInput?.value.trim() || "updated_at",
    }) });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    if (superAdminAirtableApiKeyInput) superAdminAirtableApiKeyInput.value = "";
    setSuperAdminAirtableMessage("Konfiguracja Airtable została zapisana.");
    await loadSuperAdminAirtableConfig();
  } catch (error) { setSuperAdminAirtableMessage(`Błąd zapisu: ${error.message}`, true); }
}

async function testSuperAdminAirtable() {
  if (!superAdminAuthorized) return;
  setSuperAdminAirtableMessage("Testowanie połączenia…");
  try {
     const response = await fetch("api/airtable-health.php", { headers: { Accept: "application/json" }, credentials: "same-origin", cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    setSuperAdminAirtableMessage(payload.connected ? "Połączenie Airtable działa." : (payload.reason || "Airtable nie odpowiada."), !payload.connected);
  } catch (error) { setSuperAdminAirtableMessage(`Błąd testu: ${error.message}`, true); }
}

async function loadSuperAdminSyncSettings() {
  if (!superAdminAuthorized) return;
  renderSuperAdminSyncFamilies();
  try {
     const response = await fetch("api/sync-settings.php", { headers: { Accept: "application/json" }, credentials: "same-origin", cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    const settings = payload.settings || {};
    if (superAdminSyncMode) superAdminSyncMode.value = settings.mode || "manual";
    if (superAdminSyncWeeks) superAdminSyncWeeks.value = String(settings.weeks || 0);
    if (superAdminSyncDays) superAdminSyncDays.value = String(settings.days || 0);
    if (superAdminSyncHours) superAdminSyncHours.value = String(settings.hours || 0);
    if (superAdminSyncMinutes) superAdminSyncMinutes.value = String(settings.minutes ?? 30);
    setSuperAdminSyncMessage("Globalny harmonogram został wczytany.");
  } catch (error) { setSuperAdminSyncMessage(`Błąd harmonogramu: ${error.message}`, true); }
}

async function applyGlobalSyncSettings() {
  try {
     const response = await fetch("api/sync-settings.php", { headers: { Accept: "application/json" }, credentials: "same-origin", cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload.success) return;
    const settings = payload.settings || {};
    userSettings = normalizeSettings({ ...userSettings, syncMode: settings.mode, syncWeeks: settings.weeks, syncDays: settings.days, syncHours: settings.hours, syncMinutes: settings.minutes });
    updateSyncTimer();
  } catch {
    // The existing local family settings remain a safe offline fallback.
  }
}

async function saveSuperAdminSyncSettings() {
  if (!superAdminAuthorized) return;
  try {
     const response = await fetch("api/sync-settings.php", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({
      mode: superAdminSyncMode?.value || "manual", weeks: superAdminSyncWeeks?.value || 0, days: superAdminSyncDays?.value || 0,
      hours: superAdminSyncHours?.value || 0, minutes: superAdminSyncMinutes?.value || 0,
    }) });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    setSuperAdminSyncMessage("Globalny harmonogram został zapisany.");
  } catch (error) { setSuperAdminSyncMessage(`Błąd zapisu harmonogramu: ${error.message}`, true); }
}

async function runSuperAdminSync() {
  if (!superAdminAuthorized || !superAdminSyncFamily?.value) { setSuperAdminSyncMessage("Wybierz rodzinę.", true); return; }
  setSuperAdminSyncMessage("Synchronizacja…");
  try {
     const response = await fetch("api/admin-sync.php", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify({ family: superAdminSyncFamily.value }) });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || `HTTP ${response.status}`);
    setSuperAdminSyncMessage(`Zsynchronizowano rekordów: ${payload.records ?? 0}.`);
  } catch (error) { setSuperAdminSyncMessage(`Błąd synchronizacji: ${error.message}`, true); }
}

async function saveItems() {
  const user = getActiveUser();
  const sharedPayload = buildSharedPayload();
  const diaryPayload = buildDiaryPayload();

  // Large payloads (especially photos in older records) must not block the UI
  // through synchronous localStorage serialization. IndexedDB is the primary
  // offline store; localStorage contains only small state flags and revisions.
  markPendingSharedSync();
  markPendingDiarySync(user);

  const writeTask = offlineWriteChain.then(async () => {
    const previousSharedPayload = await getCachedPayload("shared", user);
    await cachePayload("shared", sharedPayload, user);
    await cachePayload("diary", diaryPayload, user);
    const queuedOperations = await getQueuedOperations();
    const nextOperations = buildSharedOperations(previousSharedPayload, sharedPayload);
    if (nextOperations.length > 0) {
      await setQueuedOperations([...queuedOperations, ...nextOperations]);
    }
    if (!navigator.onLine) {
      const queuedCount = (await getQueuedOperations()).length;
      setSyncStatus(`Tryb offline — zmiany zapisane w urządzeniu. Oczekuje ${queuedCount} zmian.`, true);
      setDataDirty();
      return false;
    }
    schedulePendingSync();
    return true;
  });
  offlineWriteChain = writeTask.catch(() => undefined);
  return writeTask;
}

function schedulePendingSync() {
  if (syncDebounceTimer !== null) {
    clearTimeout(syncDebounceTimer);
  }
  syncDebounceTimer = window.setTimeout(() => {
    syncDebounceTimer = null;
    void trySyncPendingData();
  }, 700);
}

async function loadItems() {
  const user = getActiveUser();

  const localSharedPayload = await getCachedPayload("shared", user);
  const localDiaryPayload = await getCachedPayload("diary", user);
  const pendingShared = hasPendingSharedSync();
  const pendingDiary = hasPendingDiarySync(user);

  const fetchJson = async (url, revision = "") => {
    try {
      const headers = { Accept: "application/json" };
      if (revision) headers["If-None-Match"] = `"${revision}"`;
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      if (response.status === 304) return { notModified: true };
      return response.ok ? await response.json() : null;
    } catch {
      return null;
    }
  };

  const [sharedServerPayload, diaryServerPayload] = await Promise.all([
    fetchJson(getSharedStorageUrl(), sharedServerRevision || localStorage.getItem(getSharedRevisionStorageKey()) || ""),
    fetchJson(getUserStorageUrl(user), diaryServerRevision || localStorage.getItem(getDiaryRevisionStorageKey(user)) || ""),
  ]);

  const sharedLoaded = sharedServerPayload !== null && sharedServerPayload.notModified !== true;
  const diaryLoaded = diaryServerPayload !== null && diaryServerPayload.notModified !== true;

  if (sharedLoaded) {
    // The family shopping list is shared. Once Airtable is configured as
    // its source, a stale browser cache must never replace it per device.
    if (pendingShared && localSharedPayload && sharedServerPayload?.source !== "airtable") {
      applySharedPayload(localSharedPayload);
    } else {
      applySharedPayload(sharedServerPayload);
    }
    await cachePayload("shared", buildSharedPayload(), user);
  }

  if (!sharedLoaded) {
    if (localSharedPayload) {
      applySharedPayload(localSharedPayload);
    } else {
      items = [];
      userSettings = { ...DEFAULT_USER_SETTINGS };
      applyAccountTheme();
    }
  }

  if (diaryLoaded) {
    if (pendingDiary && localDiaryPayload) {
      applyDiaryPayload(localDiaryPayload);
    } else {
      applyDiaryPayload(diaryServerPayload);
    }
    await cachePayload("diary", buildDiaryPayload(), user);
  }

  if (!diaryLoaded) {
    if (localDiaryPayload) {
      applyDiaryPayload(localDiaryPayload);
    } else {
      diaryEntries = [];
    }
  }

  if (navigator.onLine) {
    void trySyncPendingData();
  }
}

async function loadItemsInBackground() {
  const user = getActiveUser();
  const [cachedShared, cachedDiary] = await Promise.all([
    getCachedPayload("shared", user),
    getCachedPayload("diary", user),
  ]);
  if (cachedShared) {
    applySharedPayload(cachedShared);
    userSettingsReady = true;
  }
  if (cachedDiary) applyDiaryPayload(cachedDiary);
  if (cachedShared || cachedDiary) {
    await restorePendingImages();
    renderItems();
    setActiveTab(activeTab);
    setShopLoadingStatus("Odświeżanie listy…");
  } else {
    setShopLoadingStatus("Lista jest wczytywana, czekaj…");
  }
  try {
    await loadItems();
    userSettingsReady = true;
    await restorePendingImages();
    renderItems();
    setActiveTab(activeTab);
    void migrateLegacyImages();
    setShopLoadingStatus("");
    if (!navigator.onLine) {
      const queuedCount = (await getQueuedOperations()).length;
      setSyncStatus(`Tryb offline — zmiany zapisane w urządzeniu. Oczekuje ${queuedCount} zmian.`, true);
    }
  } catch {
    setShopLoadingStatus("Nie udało się pobrać listy. Spróbuj odświeżyć stronę.", true);
  }
}

async function trySyncPendingData(skipWriteWait = false) {
  if (!skipWriteWait) {
    await offlineWriteChain;
  }
  const user = getActiveUser();
  const pendingShared = hasPendingSharedSync();
  const pendingDiary = hasPendingDiarySync(user);

  if (!pendingShared && !pendingDiary) {
    return true;
  }
  if (!navigator.onLine) {
    return false;
  }

  const sharedPayload = await getCachedPayload("shared", user) || buildSharedPayload();
  const diaryPayload = await getCachedPayload("diary", user) || buildDiaryPayload();
  const queuedOperations = await getQueuedOperations();
  const baseRevision = sharedServerRevision || localStorage.getItem(getSharedRevisionStorageKey()) || "";

  let sharedSynced = !pendingShared;
  let diarySynced = !pendingDiary;

  try {
    if (pendingShared) {
      if (queuedOperations.length === 0) {
        // A legacy pending flag without explicit operations must never overwrite a shared list.
        clearPendingSharedSync();
      } else if (!baseRevision) {
        sharedSynced = false;
        setSyncStatus("Zmiany offline wymagają najpierw odczytu aktualnej listy z serwera.", true);
      } else {
        setSyncStatus(`Synchronizacja… (${queuedOperations.length} zmian)`);
        const sharedResponse = await fetch(`${getSharedStorageUrl()}&action=operations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operations: queuedOperations, baseRevision }),
        });
        sharedSynced = sharedResponse.ok;
        if (sharedSynced) {
          clearPendingSharedSync();
          await setQueuedOperations([]);
        }
      }
    }

    if (pendingDiary) {
      const diaryResponse = await fetch(`${getUserStorageUrl(user)}&sync=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diaryPayload),
      });
      const diaryResult = await diaryResponse.json().catch(() => null);
      diarySynced = diaryResponse.ok && (diaryResult?.airtable_enabled === false || diaryResult?.airtable_synced === true);
      if (diarySynced) {
        clearPendingDiarySync(user);
      }
    }
  } catch (error) {
    console.warn("Synchronizacja odroczona nie powiodła się:", error);
    return false;
  }

  const synced = sharedSynced && diarySynced;
  if (synced) {
    setSyncStatus("Dane zsynchronizowane.");
  } else {
    setSyncStatus("Część zmian nadal czeka na synchronizację.", true);
  }
  return synced;
}

function formatQuantity(quantity) {
  if (Number.isInteger(quantity)) {
    return quantity;
  }
  return quantity.toFixed(2).replace(/\.00$/, "");
}

function getNutritionScaleForItem(item) {
  if (!item) {
    return null;
  }

  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  const normalizedUnit = (item.unit || "").toLowerCase();
  if (normalizedUnit === "kg") {
    return quantity * 10;
  }
  if (normalizedUnit === "g") {
    return quantity / 100;
  }
  return quantity;
}

function formatNutritionLabel(nutrition, item = null, options = {}) {
  const parts = [];
  const forceAmount = options.forceAmount === true;
  const mode = forceAmount ? "perAmount" : userSettings.macroDisplayMode;
  const scale = mode === "perAmount" ? getNutritionScaleForItem(item) : null;

  const valueForDisplay = (value) => {
    if (value == null) {
      return null;
    }
    if (scale == null) {
      return value;
    }
    return value * scale;
  };

  if (nutrition.kcal != null) {
    parts.push(`${formatQuantity(valueForDisplay(nutrition.kcal))} kcal`);
  }
  if (nutrition.protein != null) {
    parts.push(`B: ${formatQuantity(valueForDisplay(nutrition.protein))} g`);
  }
  if (nutrition.fat != null) {
    parts.push(`T: ${formatQuantity(valueForDisplay(nutrition.fat))} g`);
  }
  if (nutrition.carbs != null) {
    parts.push(`W: ${formatQuantity(valueForDisplay(nutrition.carbs))} g`);
  }

  if (mode === "perAmount") {
    parts.push(scale == null ? "(na ilość: brak skali)" : "(na ilość produktu)");
  } else {
    parts.push("(na 100 g)");
  }

  return parts.join(" • ");
}

function formatNutritionForNamedEntry(nutrition, quantity, unit) {
  return formatNutritionLabel(nutrition, { quantity, unit }, { forceAmount: true });
}

function setUserSettingsStatus(message, isError = false) {
  if (!userSettingsStatus) {
    return;
  }
  userSettingsStatus.textContent = message;
  userSettingsStatus.classList.toggle("error", isError);
}

function fillUserSettingsForm() {
  if (!macroDisplayModeSelect) {
    return;
  }
  macroDisplayModeSelect.value = userSettings.macroDisplayMode || "per100g";
  if (macroVisibleProductsCheckbox) {
    macroVisibleProductsCheckbox.checked = userSettings.showMacroProducts === true;
  }
  if (macroVisibleDiaryCheckbox) {
    macroVisibleDiaryCheckbox.checked = userSettings.showMacroDiary !== false;
  }
  if (diaryTabVisibleCheckbox) {
    diaryTabVisibleCheckbox.checked = userSettings.hideDiary !== true;
  }
  if (shoppingOwnerVisibleCheckbox) {
    shoppingOwnerVisibleCheckbox.checked = userSettings.showShoppingOwnerInfo !== false;
  }
  if (shoppingCategoryGroupingCheckbox) {
    shoppingCategoryGroupingCheckbox.checked = userViewSettings.groupShoppingByCategory === true;
  }
  if (allProductsCategoryGroupingCheckbox) {
    allProductsCategoryGroupingCheckbox.checked = userViewSettings.groupAllProductsByCategory !== false;
  }
  if (darkThemeToggle) darkThemeToggle.checked = userSettings.theme === "dark";
  if (shoppingMoveOnSelectionCheckbox) {
    shoppingMoveOnSelectionCheckbox.checked = userViewSettings.moveOnSelection === true;
  }
}

async function saveUserSettings() {
  if (!macroDisplayModeSelect) {
    return;
  }

  readSyncSettingsFromForm();
  userSettings = normalizeSettings({
    ...userSettings,
    macroDisplayMode: macroDisplayModeSelect.value,
    showMacroProducts: macroVisibleProductsCheckbox ? macroVisibleProductsCheckbox.checked : userSettings.showMacroProducts,
    showMacroDiary: macroVisibleDiaryCheckbox ? macroVisibleDiaryCheckbox.checked : userSettings.showMacroDiary,
    hideDiary: diaryTabVisibleCheckbox ? !diaryTabVisibleCheckbox.checked : userSettings.hideDiary,
    showShoppingOwnerInfo: shoppingOwnerVisibleCheckbox ? shoppingOwnerVisibleCheckbox.checked : userSettings.showShoppingOwnerInfo,
    theme: darkThemeToggle?.checked ? "dark" : "light",
  });
  applyAccountTheme();
  userViewSettings = normalizeUserViewSettings({
    groupShoppingByCategory: shoppingCategoryGroupingCheckbox ? shoppingCategoryGroupingCheckbox.checked : userViewSettings.groupShoppingByCategory,
    groupAllProductsByCategory: allProductsCategoryGroupingCheckbox ? allProductsCategoryGroupingCheckbox.checked : userViewSettings.groupAllProductsByCategory,
    moveOnSelection: shoppingMoveOnSelectionCheckbox ? shoppingMoveOnSelectionCheckbox.checked : userViewSettings.moveOnSelection,
  });

  setUserSettingsStatus("Zapisywanie ustawień...");
  try {
    await saveItems();
    updateSyncTimer();
    renderItems();
    setActiveTab(activeTab);
    setUserSettingsStatus("Ustawienia zapisane.");
  } catch (error) {
    setUserSettingsStatus(`Błąd zapisu ustawień: ${error.message}`, true);
  }
}

async function fetchNutritionOpenFoodFacts(query) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open Food Facts HTTP ${response.status}`);
  }
  const data = await response.json();
  const product = data.products && data.products[0];
  if (!product) {
    return null;
  }
  const nutriments = product.nutriments || {};
  const getValue = (keys) => keys.map((key) => nutriments[key]).find((value) => value != null);
  const kcal = getValue(["energy-kcal_100g", "energy-kcal_value", "energy-kcal", "energy_100g", "energy_value"]);
  const protein = getValue(["proteins_100g", "proteins_value", "proteins"]);
  const fat = getValue(["fat_100g", "fat_value", "fat"]);
  const carbs = getValue(["carbohydrates_100g", "carbohydrates_value", "carbohydrates"]);
  if (kcal == null && protein == null && fat == null && carbs == null) {
    return null;
  }
  return {
    source: "Open Food Facts",
    productName: product.product_name || product.generic_name || query,
    kcal,
    protein,
    fat,
    carbs,
  };
}

async function fetchNutritionOpenFoodRepo(query) {
  const url = `https://openfoodrepo.org/api/v3/products?label=${encodeURIComponent(query)}&limit=1`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  const product = data?.data?.[0];
  if (!product) {
    return null;
  }
  const rawNutrition = product.nutritional_values || product.nutritional_value || product.nutrients || product.nutritional;
  let values = {};
  if (Array.isArray(rawNutrition)) {
    rawNutrition.forEach((item) => {
      if (item.name && item.value != null) {
        values[item.name.toLowerCase()] = item.value;
      }
    });
  } else if (rawNutrition && typeof rawNutrition === "object") {
    values = rawNutrition;
  }
  const getValue = (keys) => keys.map((key) => values[key] ?? values[key.toLowerCase()]).find((value) => value != null);
  const kcal = getValue(["energy-kcal_100g", "energy-kcal_value", "energy-kcal", "energy_100g", "energy_value", "kcal"]);
  const protein = getValue(["proteins_100g", "proteins_value", "proteins", "protein"]);
  const fat = getValue(["fat_100g", "fat_value", "fat"]);
  const carbs = getValue(["carbohydrates_100g", "carbohydrates_value", "carbohydrates", "carbs"]);
  if (kcal == null && protein == null && fat == null && carbs == null) {
    return null;
  }
  return {
    source: "Open Food Repo",
    productName: product.name || query,
    kcal,
    protein,
    fat,
    carbs,
  };
}

async function fetchNutritionViaProxy(query) {
  const response = await fetch(`${NUTRITION_PROXY_URL}?q=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    return null;
  }
  const payload = await response.json();
  if (!payload?.success || !payload.nutrition) {
    return null;
  }
  return payload.nutrition;
}

async function fetchNutritionForName(query) {
  try {
    return await fetchNutritionViaProxy(query);
  } catch (error) {
    console.warn("Nutrition proxy lookup failed:", error);
    return null;
  }
}

function parseNutritionInputNumber(value) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return null;
  }
  const normalized = raw.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function hasAnyNutritionValue(nutrition) {
  return nutrition.kcal != null || nutrition.protein != null || nutrition.fat != null || nutrition.carbs != null;
}

function openManualNutritionModal(productName) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "nutrition-modal-overlay";

    const dialog = document.createElement("div");
    dialog.className = "nutrition-modal";

    const title = document.createElement("h3");
    title.textContent = `Brak danych API dla: ${productName || "produkt"}`;

    const subtitle = document.createElement("p");
    subtitle.className = "panel-note";
    subtitle.textContent = "Możesz opcjonalnie wpisać makro ręcznie. Puste pola zostaną pominięte.";

    const form = document.createElement("div");
    form.className = "nutrition-modal-grid";

    const kcalInput = document.createElement("input");
    kcalInput.type = "text";
    kcalInput.inputMode = "decimal";
    kcalInput.placeholder = "kcal";

    const proteinInput = document.createElement("input");
    proteinInput.type = "text";
    proteinInput.inputMode = "decimal";
    proteinInput.placeholder = "Białko (g)";

    const fatInput = document.createElement("input");
    fatInput.type = "text";
    fatInput.inputMode = "decimal";
    fatInput.placeholder = "Tłuszcz (g)";

    const carbsInput = document.createElement("input");
    carbsInput.type = "text";
    carbsInput.inputMode = "decimal";
    carbsInput.placeholder = "Węglowodany (g)";

    form.appendChild(kcalInput);
    form.appendChild(proteinInput);
    form.appendChild(fatInput);
    form.appendChild(carbsInput);

    const status = document.createElement("p");
    status.className = "error";
    status.textContent = "";

    const actions = document.createElement("div");
    actions.className = "nutrition-modal-actions";

    const skipButton = document.createElement("button");
    skipButton.type = "button";
    skipButton.className = "secondary small";
    skipButton.textContent = "Pomiń";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Zapisz makro";

    actions.appendChild(skipButton);
    actions.appendChild(saveButton);

    dialog.appendChild(title);
    dialog.appendChild(subtitle);
    dialog.appendChild(form);
    dialog.appendChild(status);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const closeWith = (value) => {
      overlay.remove();
      resolve(value);
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeWith(null);
      }
    });

    skipButton.addEventListener("click", () => {
      closeWith(null);
    });

    saveButton.addEventListener("click", () => {
      const kcal = parseNutritionInputNumber(kcalInput.value);
      const protein = parseNutritionInputNumber(proteinInput.value);
      const fat = parseNutritionInputNumber(fatInput.value);
      const carbs = parseNutritionInputNumber(carbsInput.value);

      if ([kcal, protein, fat, carbs].some((value) => Number.isNaN(value))) {
        status.textContent = "Wpisz poprawne wartości liczbowe (np. 12 lub 12.5).";
        return;
      }

      const nutrition = {
        source: "Ręcznie",
        productName: productName || "",
        kcal,
        protein,
        fat,
        carbs,
      };

      if (!hasAnyNutritionValue(nutrition)) {
        closeWith(null);
        return;
      }

      closeWith(nutrition);
    });
  });
}

async function lookupNutrition(item) {
  item.nutritionLoading = true;
  item.nutritionError = null;
  saveItems();
  renderItems();
  let result = await fetchNutritionForName(item.name);
  item.nutritionLoading = false;
  if (!result) {
    result = await openManualNutritionModal(item.name);
  }
  if (result) {
    item.nutrition = result;
    item.nutritionSource = result.source;
    item.nutritionError = null;
  } else {
    item.nutrition = null;
    item.nutritionError = "Brak danych z API";
  }
  saveItems();
  renderItems();
}

async function lookupNutritionForDiaryEntry(entry) {
  entry.nutritionLoading = true;
  saveItems();
  renderDiaryCard();

  let result = await fetchNutritionForName(entry.name);
  entry.nutritionLoading = false;

  if (!result) {
    result = await openManualNutritionModal(entry.name);
  }

  if (result) {
    entry.nutrition = result;
    entry.nutritionSource = result.source;
    entry.nutritionError = null;
    setUserSettingsStatus("Pobrano makro dla wpisu w Mojej diecie.");
  } else {
    entry.nutrition = null;
    entry.nutritionError = "Brak danych z API";
    setUserSettingsStatus("Nie udało się pobrać makro dla wpisu.", true);
  }

  saveItems();
  renderDiaryCard();
}

function renderCategoryGroup(container, category, groupItems, section, startIndex) {
  const key = `${section}:${category}`;
  const collapsed = collapsedCategorySections.has(key);
  const heading = document.createElement("div");
  heading.className = "category-heading";
  const label = document.createElement("span");
  label.textContent = category;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "category-toggle secondary small";
  toggle.textContent = collapsed ? "▼" : "▲";
  toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  toggle.setAttribute("aria-label", `${collapsed ? "Rozwiń" : "Zwiń"} kategorię ${category}`);
  toggle.addEventListener("click", () => {
    if (collapsed) collapsedCategorySections.delete(key);
    else collapsedCategorySections.add(key);
    renderItems();
  });
  heading.append(label, toggle);
  container.appendChild(heading);
  if (!collapsed) {
    groupItems.forEach((item, index) => container.appendChild(createItemRow(item, startIndex + index, section === "all", section)));
  }
}

function renderItems() {
  const shopping = items.filter((item) => !item.bought);
  const sortedShopping = getSortedShoppingItems(shopping);
  const all = items.filter((item) => item.bought);

  updateShoppingSortButtonLabel();
  updateShoppingCompletionControl();
  refreshCategorySuggestions();

  if (activeTab === "shop") {
    shopItems.innerHTML = "";
    if (sortedShopping.length === 0) {
      shopItems.innerHTML = "<p>Brak produktów na liście zakupów. Dodaj produkt poniżej.</p>";
    } else if (userViewSettings.groupShoppingByCategory === true) {
      const groups = groupItemsByCategory(sortedShopping);
      let itemIndex = 1;
      groups.forEach((group, category) => {
        renderCategoryGroup(shopItems, category, group, "shop", itemIndex);
        itemIndex += group.length;
      });
    } else {
      sortedShopping.forEach((item, index) => shopItems.appendChild(createItemRow(item, index + 1, false, "shop")));
    }
  }

  if (activeTab === "all") {
    allItems.innerHTML = "";
    if (all.length === 0) {
      allItems.innerHTML = "<p>Brak produktów. Dodaj nowy produkt poniżej.</p>";
    } else {
      const visible = all.slice(0, allProductsLimit);
      if (userViewSettings.groupAllProductsByCategory !== false) {
        const groups = groupItemsByCategory(visible);
        let itemIndex = 1;
        groups.forEach((group, category) => {
          renderCategoryGroup(allItems, category, group, "all", itemIndex);
          itemIndex += group.length;
        });
      } else {
        visible.forEach((item, index) => allItems.appendChild(createItemRow(item, index + 1, true, "all")));
      }
      if (visible.length < all.length) {
        const moreButton = document.createElement("button");
        moreButton.type = "button";
        moreButton.className = "secondary";
        moreButton.textContent = `Pokaż więcej (${all.length - visible.length})`;
        moreButton.addEventListener("click", () => {
          allProductsLimit += 75;
          renderItems();
        });
        allItems.appendChild(moreButton);
      }
    }
  }

  if (activeTab === "diary") renderDiaryCard();
  if (isAdminUser() && activeAdminTab === "products") {
    renderProductsData();
  }
}

function isValidCalendarDate(day, month, year) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) {
    return false;
  }
  if (y < 1900 || y > 9999 || m < 1 || m > 12 || d < 1 || d > 31) {
    return false;
  }
  const check = new Date(y, m - 1, d);
  return check.getFullYear() === y && check.getMonth() === m - 1 && check.getDate() === d;
}

function formatDiaryDate(day, month, year) {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year).padStart(4, "0");
  return `${dd}/${mm}/${yyyy}`;
}

function formatIsoDiaryDate(day, month, year) {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year).padStart(4, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeDiaryDate(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  let match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    return isValidCalendarDate(day, month, year) ? formatDiaryDate(day, month, year) : "";
  }

  // Backward compatibility for older entries stored as yyyy-mm-dd.
  match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    return isValidCalendarDate(day, month, year) ? formatDiaryDate(day, month, year) : "";
  }

  return "";
}

function normalizeDiaryDateToIso(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  let match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    return isValidCalendarDate(day, month, year) ? formatIsoDiaryDate(day, month, year) : "";
  }

  match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    return isValidCalendarDate(day, month, year) ? formatIsoDiaryDate(day, month, year) : "";
  }

  return "";
}

function getTodayDiaryIsoDate() {
  const today = new Date();
  return formatIsoDiaryDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
}

function getTodayDateString() {
  const today = new Date();
  return formatDiaryDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
}

function getSelectedDiaryDate() {
  const normalized = normalizeDiaryDate(diaryDateInput?.value || "");
  return normalized || getTodayDateString();
}

function ensureDiaryDateDefault() {
  if (!diaryDateInput) {
    return;
  }

  const normalizedIso = normalizeDiaryDateToIso(diaryDateInput.value || "");
  diaryDateInput.value = normalizedIso || getTodayDiaryIsoDate();
}

function normalizeDiaryDateInput() {
  if (!diaryDateInput) {
    return;
  }

  const normalizedIso = normalizeDiaryDateToIso(diaryDateInput.value || "");
  diaryDateInput.value = normalizedIso || getTodayDiaryIsoDate();
}

function getDiaryEntriesForDate(dateValue) {
  const normalizedSelectedDate = normalizeDiaryDate(dateValue);
  if (!normalizedSelectedDate) {
    return [];
  }

  return diaryEntries.filter((entry) => normalizeDiaryDate(entry.date) === normalizedSelectedDate);
}

function calculateDiaryTotals(entries) {
  const totals = {
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };

  entries.forEach((entry) => {
    if (!entry.nutrition) {
      return;
    }
    const scale = getNutritionScaleForItem(entry);
    if (scale == null) {
      return;
    }
    totals.kcal += Number(entry.nutrition.kcal || 0) * scale;
    totals.protein += Number(entry.nutrition.protein || 0) * scale;
    totals.fat += Number(entry.nutrition.fat || 0) * scale;
    totals.carbs += Number(entry.nutrition.carbs || 0) * scale;
  });

  return totals;
}

function renderDiaryCard() {
  if (!diaryItems || !diarySummary) {
    return;
  }

  ensureDiaryDateDefault();
  const selectedDate = getSelectedDiaryDate();
  const entries = getDiaryEntriesForDate(selectedDate);
  const isMacroVisible = isMacroVisibleForSection("diary");

  if (isMacroVisible) {
    const totals = calculateDiaryTotals(entries);
    diarySummary.innerHTML = `
      <div class="item-name-text">Suma dnia: ${selectedDate}</div>
      <div class="item-name-meta">${formatQuantity(totals.kcal)} kcal • B: ${formatQuantity(totals.protein)} g • T: ${formatQuantity(totals.fat)} g • W: ${formatQuantity(totals.carbs)} g</div>
    `;
  } else {
    diarySummary.innerHTML = `
      <div class="item-name-text">Suma dnia: ${selectedDate}</div>
      <div class="item-name-meta">Makro ukryte w ustawieniach.</div>
    `;
  }

  diaryItems.innerHTML = "";
  if (entries.length === 0) {
    diaryItems.innerHTML = "<p>Brak wpisów na ten dzień.</p>";
    return;
  }

  entries.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "item-row";

    const orderBadge = document.createElement("div");
    orderBadge.className = "item-order";
    orderBadge.textContent = index + 1;

    const info = document.createElement("div");
    info.className = "item-name";
    const title = document.createElement("div");
    title.className = "item-name-text";
    title.textContent = `${entry.name} (${formatQuantity(entry.quantity)} ${entry.unit})`;
    const meta = document.createElement("div");
    meta.className = "item-name-meta";
    if (entry.nutritionLoading) {
      meta.textContent = "Pobieranie danych makro...";
    } else if (entry.nutrition) {
      meta.textContent = formatNutritionForNamedEntry(entry.nutrition, entry.quantity, entry.unit);
    } else if (entry.nutritionError) {
      meta.textContent = entry.nutritionError;
    } else {
      meta.textContent = "Brak danych makro dla produktu";
    }

    info.appendChild(title);
    if (isMacroVisible) {
      info.appendChild(meta);
    }

    const actions = document.createElement("div");
    actions.className = "item-qty";

    const nutritionButton = document.createElement("button");
    nutritionButton.type = "button";
    nutritionButton.className = "item-nutrition-button";
    nutritionButton.title = entry.nutrition ? "Odśwież dane makro" : "Pobierz makro";
    nutritionButton.textContent = entry.nutrition ? "🔄" : "🔎";
    nutritionButton.addEventListener("click", () => {
      void lookupNutritionForDiaryEntry(entry);
    });
    actions.appendChild(nutritionButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "item-delete-button";
    deleteButton.title = "Usuń wpis";
    deleteButton.textContent = "−";
    deleteButton.addEventListener("click", () => {
      diaryEntries = diaryEntries.filter((existing) => existing.id !== entry.id);
      saveItems();
      renderDiaryCard();
    });
    actions.appendChild(deleteButton);

    row.appendChild(orderBadge);
    row.appendChild(info);
    row.appendChild(actions);
    diaryItems.appendChild(row);
  });
}

function addDiaryEntry() {
  const selectedDate = getSelectedDiaryDate();
  const name = (diaryProductNameInput?.value || "").trim();
  const rawQuantity = Number(diaryQuantityInput?.value || "1");
  const quantity = Number.isFinite(rawQuantity) ? Math.max(0.01, Math.round(rawQuantity * 100) / 100) : 1;
  const unit = diaryUnitInput?.value || "szt";

  if (!name) {
    setUserSettingsStatus("Podaj nazwę produktu do sekcji Moja dieta.", true);
    return;
  }

  const sourceItem = items.find((item) => item.name.toLowerCase() === name.toLowerCase());
  const nutrition = sourceItem?.nutrition || null;

  diaryEntries.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: selectedDate,
    name,
    quantity,
    unit,
    nutrition,
    createdAt: new Date().toISOString(),
  });

  setUserSettingsStatus(
    nutrition
      ? "Dodano wpis do sekcji Moja dieta."
      : "Dodano wpis bez makro (najpierw pobierz makro dla produktu na liście)."
  );

  if (diaryProductNameInput) {
    diaryProductNameInput.value = "";
  }
  if (diaryQuantityInput) {
    diaryQuantityInput.value = "1";
  }

  saveItems();
  renderDiaryCard();
}

function createItemRow(item, order, isPurchased, section = "shop") {
  const row = document.createElement("div");
  row.className = `item-row ${section === "all" ? "all-product-row" : ""} ${item.bought ? "checked" : item.selected ? "selected" : ""}`;
  let rowMeta = null;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isPurchased ? true : item.selected;
  checkbox.addEventListener("change", () => {
    if (isPurchased) {
      if (!checkbox.checked) {
        showTransferEditor(item, row, checkbox);
      }
    } else {
      if (userViewSettings.moveOnSelection === true && checkbox.checked) {
        item.bought = true;
        item.selected = false;
        item.lastQuantity = item.quantity;
        item.lastUnit = item.unit;
        saveItems();
        renderItems();
        return;
      }
      item.selected = checkbox.checked;
      saveItems();
      renderItems();
    }
  });

  const orderBadge = document.createElement("div");
  orderBadge.className = "item-order";
  orderBadge.textContent = order;

  const name = document.createElement("div");
  name.className = "item-name";
  const nameText = document.createElement("div");
  nameText.className = "item-name-text";
  nameText.textContent = item.name;
  name.appendChild(nameText);

  if (section === "all") {
    const category = document.createElement("div");
    category.className = "item-category";
    category.textContent = getCategoryLabel(item);
    name.appendChild(category);

  }

  if (isMacroVisibleForSection(section) && (item.nutritionLoading || item.nutrition || item.nutritionError)) {
    rowMeta = document.createElement("div");
    rowMeta.className = "item-name-meta item-row-meta";
    if (item.nutritionLoading) {
      rowMeta.textContent = "Ładowanie danych żywieniowych...";
    } else if (item.nutrition) {
      rowMeta.textContent = formatNutritionLabel(item.nutrition, item);
    } else if (item.nutritionError) {
      rowMeta.textContent = item.nutritionError;
    }
  }

  const quantity = document.createElement("div");
  quantity.className = "item-qty";
  const quantityLabel = document.createElement("span");
  quantityLabel.className = "item-qty-label";
  quantityLabel.innerHTML = `<span class="item-qty-value">${formatQuantity(item.quantity)}</span><span class="item-unit">${item.unit}</span>`;
  quantity.appendChild(quantityLabel);

  if (section === "all") {
    const expandButton = document.createElement("button");
    expandButton.type = "button";
    expandButton.className = "all-product-expand-button";
    const isExpanded = expandedProductActions.has(item.id);
    expandButton.title = isExpanded ? "Ukryj akcje produktu" : "Pokaż akcje produktu";
    expandButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    expandButton.setAttribute("aria-label", expandButton.title);
    expandButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (expandedProductActions.has(item.id)) expandedProductActions.delete(item.id);
      else expandedProductActions.add(item.id);
      renderItems();
    });
    quantity.appendChild(expandButton);
  }

  const allProductActions = section === "all" ? document.createElement("div") : null;
  if (allProductActions) {
    allProductActions.className = `all-product-actions${expandedProductActions.has(item.id) ? " expanded" : ""}`;
  }

  const appendProductAction = (button) => {
    (allProductActions || quantity).appendChild(button);
  };

  const viewButton = document.createElement("button");
  viewButton.type = "button";
  viewButton.className = "item-view-button";
  viewButton.title = "Zdjęcie produktu";
  viewButton.textContent = "📷";
  viewButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImagePreview(item);
  });
  appendProductAction(viewButton);

  if (section === "shop" && userSettings.showShoppingOwnerInfo !== false) {
    const ownerLogin = String(item.shoppingOwnerLogin || "").trim().toLowerCase();
    const ownerInitial = normalizeOwnerInitial(item.shoppingOwnerInitial);
    const ownerBadgeText = ownerLogin
      ? ownerLogin.charAt(0).toUpperCase()
      : ownerInitial || "?";

    const ownerBadge = document.createElement("span");
    ownerBadge.className = "item-owner-badge";
    ownerBadge.title = "Osoba, która dodała lub przeniosła produkt na listę zakupów";
    ownerBadge.textContent = ownerBadgeText;
    quantity.appendChild(ownerBadge);
  }

  if (section !== "shop") {
    const nutritionButton = document.createElement("button");
    nutritionButton.type = "button";
    nutritionButton.className = "item-nutrition-button";
    nutritionButton.title = item.nutrition ? "Odśwież dane żywieniowe" : "Wyszukaj wartości odżywcze";
    nutritionButton.textContent = item.nutrition ? "🔄" : "🔎";
    nutritionButton.addEventListener("click", (event) => {
      event.stopPropagation();
      lookupNutrition(item);
    });
    appendProductAction(nutritionButton);
  }

  if (isPurchased) {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "item-edit-button";
    editButton.title = "Edytuj produkt";
    editButton.textContent = "✎";
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openProductEditor(item);
    });
    appendProductAction(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "item-delete-button";
    deleteButton.title = "Usuń produkt";
    deleteButton.textContent = "−";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const accepted = window.confirm(`Czy na pewno chcesz trwale usunąć produkt „${item.name}”?`);
      if (!accepted) return;
      items = items.filter((existing) => existing.id !== item.id);
      void saveItems().catch((error) => setSyncStatus(`Nie udało się usunąć produktu: ${error.message}`, true));
      renderItems();
    });
    appendProductAction(deleteButton);
  }

  row.appendChild(checkbox);
  row.appendChild(orderBadge);
  row.appendChild(name);
  row.appendChild(quantity);
  if (rowMeta) {
    row.appendChild(rowMeta);
  }
  if (allProductActions) {
    row.appendChild(allProductActions);
  }

  return row;
}

function handleItemCheckbox(item, checkbox, row) {
  if (item.bought && !checkbox.checked) {
    checkbox.checked = true;
    showTransferEditor(item, row, checkbox);
    return;
  }

  item.bought = checkbox.checked;
  if (item.bought) {
    item.lastQuantity = item.quantity;
    item.lastUnit = item.unit;
  }
  saveItems();
  renderItems();
}

function showTransferEditor(item, row, checkbox = null) {
  if (document.getElementById("transfer-editor")) {
    if (checkbox) {
      checkbox.checked = true;
    }
    return;
  }

  const editor = document.createElement("div");
  editor.id = "transfer-editor";
  editor.className = "transfer-editor";

  const lastQty = item.lastQuantity ?? item.quantity;
  const lastUnit = item.lastUnit ?? item.unit;
  const info = document.createElement("div");
  info.className = "transfer-info";
  info.innerHTML = `<strong>Ostatnio kupiono:</strong> ${formatQuantity(lastQty)} ${lastUnit}`;

  const form = document.createElement("div");
  form.className = "transfer-form";

  const qtyLabel = document.createElement("label");
  qtyLabel.innerHTML = `Ilość teraz<input type="number" min="0.01" step="0.01" value="${formatQuantity(item.quantity)}">`;

  const unitLabel = document.createElement("label");
  unitLabel.innerHTML = `Jednostka<select><option value="szt">szt</option><option value="kg">kg</option><option value="g">gramy</option><option value="l">litr</option><option value="ml">mililitry</option><option value="opak">opak</option></select>`;
  unitLabel.querySelector("select").value = item.unit;

  form.appendChild(qtyLabel);
  form.appendChild(unitLabel);

  const actions = document.createElement("div");
  actions.className = "transfer-actions";

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Przenieś do listy";
  confirmButton.addEventListener("click", () => {
    const newQuantity = Number(qtyLabel.querySelector("input").value);
    const newUnit = unitLabel.querySelector("select").value;
    if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
      alert("Podaj poprawną ilość.");
      return;
    }

    item.quantity = Math.max(0.01, Math.round(newQuantity * 100) / 100);
    item.unit = newUnit;
    item.bought = false;
    item.shoppingOwnerLogin = getCurrentUserLogin();
    item.shoppingOwnerInitial = getCurrentUserInitial();
    saveItems();
    renderItems();
  });

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "secondary small";
  cancelButton.textContent = "Anuluj";
  cancelButton.addEventListener("click", () => {
    if (checkbox) {
      checkbox.checked = true;
    }
    editor.remove();
  });

  actions.appendChild(confirmButton);
  actions.appendChild(cancelButton);

  editor.appendChild(info);
  editor.appendChild(form);
  editor.appendChild(actions);
  row.after(editor);
}

function readImageFile(file, onLoad) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const source = String(reader.result || "");
    const image = new Image();
    image.onload = () => {
      const maxSize = 1280;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return onLoad(source);
        const optimized = new FileReader();
        optimized.addEventListener("load", () => onLoad(String(optimized.result || source)));
        optimized.readAsDataURL(blob);
      }, "image/webp", 0.78);
    };
    image.onerror = () => onLoad(source);
    image.src = source;
  });
  reader.readAsDataURL(file);
}

function getProductImageUrl(item) {
  if (item?.imageId) {
    return `${PRODUCT_IMAGE_URL}?${getFamilyQueryPart()}&id=${encodeURIComponent(item.imageId)}`;
  }
  return item?.image || "";
}

async function uploadProductImage(item, imageData) {
  if (!item || !imageData || !navigator.onLine) {
    if (item && imageData) {
      item.image = imageData;
      await offlineDbWrite(getOfflineImageKey(item.id), imageData).catch(() => undefined);
    }
    return false;
  }
  const response = await fetch(imageData);
  const blob = await response.blob();
  const imageId = item.imageId || `image-${item.id}-${Date.now()}`;
  const body = new FormData();
  body.append("id", imageId);
  body.append("family", getActiveFamily());
  body.append("image", blob, "product.webp");
  const upload = await fetch(`${PRODUCT_IMAGE_URL}?${getFamilyQueryPart()}`, { method: "POST", body });
  const payload = await upload.json();
  if (!upload.ok || !payload.success) throw new Error(payload.error || "Nie udało się przesłać zdjęcia.");
  item.imageId = payload.imageId;
  item.image = null;
  await offlineDbDelete(getOfflineImageKey(item.id)).catch(() => undefined);
  await saveItems();
  return true;
}

async function restorePendingImages() {
  await Promise.all(items.map(async (item) => {
    if (!item?.id || item.image || item.imageId) return;
    const cached = await offlineDbRead(getOfflineImageKey(item.id)).catch(() => null);
    if (typeof cached === "string" && cached.startsWith("data:image/")) item.image = cached;
  }));
}

async function migrateLegacyImages() {
  if (legacyImageMigrationActive || !navigator.onLine) return;
  const legacy = items.filter((item) => typeof item?.image === "string" && item.image.startsWith("data:image/") && !item.imageId);
  if (legacy.length === 0) return;
  legacyImageMigrationActive = true;
  try {
    for (const item of legacy) await uploadProductImage(item, item.image);
    renderItems();
  } catch (error) {
    console.warn("Migracja starszych zdjęć zostanie ponowiona:", error);
  } finally {
    legacyImageMigrationActive = false;
  }
}

function openPhotoSourceMenu(onFileSelected) {
  const existing = document.getElementById("photo-source-menu");
  existing?.remove();

  const overlay = document.createElement("div");
  overlay.id = "photo-source-menu";
  overlay.className = "modal-overlay";
  const card = document.createElement("div");
  card.className = "modal-card photo-source-card";
  const title = document.createElement("h2");
  title.textContent = "Dodaj zdjęcie";
  const cameraButton = document.createElement("button");
  cameraButton.type = "button";
  cameraButton.textContent = "Aparat";
  const libraryButton = document.createElement("button");
  libraryButton.type = "button";
  libraryButton.className = "secondary";
  libraryButton.textContent = "Z pamięci urządzenia";
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "secondary small";
  cancelButton.textContent = "Anuluj";
  const cameraInput = document.createElement("input");
  cameraInput.type = "file";
  cameraInput.accept = "image/*";
  cameraInput.capture = "environment";
  cameraInput.className = "hidden-file-input";
  const libraryInput = document.createElement("input");
  libraryInput.type = "file";
  libraryInput.accept = "image/*";
  libraryInput.className = "hidden-file-input";
  const useFile = (input) => {
    const file = input.files?.[0];
    if (file) onFileSelected(file);
    overlay.remove();
  };
  cameraInput.addEventListener("change", () => useFile(cameraInput));
  libraryInput.addEventListener("change", () => useFile(libraryInput));
  cameraButton.addEventListener("click", () => cameraInput.click());
  libraryButton.addEventListener("click", () => libraryInput.click());
  cancelButton.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
  card.append(title, cameraButton, libraryButton, cancelButton, cameraInput, libraryInput);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function createImagePreviewOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "image-preview-overlay";
  overlay.className = "image-preview-overlay hidden";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-preview-close";
  closeButton.textContent = "✕";
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    overlay.classList.add("hidden");
  });

  const image = document.createElement("img");
  image.alt = "Zdjęcie produktu";
  image.classList.add("hidden");

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.add("hidden");
    }
  });

  const placeholder = document.createElement("div");
  placeholder.className = "image-preview-placeholder hidden";

  const actionButton = document.createElement("button");
  actionButton.type = "button";
  actionButton.className = "image-preview-action";
  actionButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openPhotoSourceMenu((file) => {
      readImageFile(file, (image) => {
        if (!currentPreviewItem) return;
        currentPreviewItem.image = image;
        void saveItems();
        renderItems();
        showImagePreview(currentPreviewItem);
        void uploadProductImage(currentPreviewItem, image).then(() => {
          renderItems();
          showImagePreview(currentPreviewItem);
        }).catch((error) => console.warn("Zdjęcie pozostanie lokalnie do kolejnej próby:", error));
      });
    });
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "image-preview-delete hidden";
  deleteButton.textContent = "Usuń zdjęcie";
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentPreviewItem) {
      currentPreviewItem.image = null;
      currentPreviewItem.imageId = null;
      saveItems();
      renderItems();
      showImagePreview(currentPreviewItem);
    }
  });

  const actions = document.createElement("div");
  actions.className = "image-preview-actions";
  actions.appendChild(actionButton);
  actions.appendChild(deleteButton);

  const content = document.createElement("div");
  content.className = "image-preview-content";
  content.appendChild(image);
  content.appendChild(placeholder);
  content.appendChild(actions);

  overlay.appendChild(closeButton);
  overlay.appendChild(content);
  document.body.appendChild(overlay);
}

function showImagePreview(item) {
  let overlay = document.getElementById("image-preview-overlay");
  if (!overlay) {
    createImagePreviewOverlay();
    overlay = document.getElementById("image-preview-overlay");
  }

  currentPreviewItem = item;
  const image = overlay.querySelector("img");
  const placeholder = overlay.querySelector(".image-preview-placeholder");
  const actionButton = overlay.querySelector(".image-preview-action");

  const deleteButton = overlay.querySelector(".image-preview-delete");

  const imageSource = getProductImageUrl(item);
  if (imageSource) {
    image.src = imageSource;
    image.classList.remove("hidden");
    placeholder.classList.add("hidden");
    actionButton.textContent = "Zmień zdjęcie";
    deleteButton.classList.remove("hidden");
  } else {
    image.classList.add("hidden");
    image.src = "";
    placeholder.classList.remove("hidden");
    placeholder.textContent = "Brak zdjęcia produktu.";
    actionButton.textContent = "Dodaj zdjęcie";
    deleteButton.classList.add("hidden");
  }

  overlay.classList.remove("hidden");
}

function openProductEditor(item) {
  document.getElementById("product-editor")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "product-editor";
  overlay.className = "modal-overlay";
  const card = document.createElement("div");
  card.className = "modal-card product-editor-card";
  let pendingImage = item.image || null;
  const title = document.createElement("h2");
  title.textContent = "Edytuj produkt";
  const form = document.createElement("div");
  form.className = "grid-form";
  const createField = (labelText, control) => {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.appendChild(control);
    form.appendChild(label);
    return control;
  };
  const nameInput = createField("Nazwa", document.createElement("input"));
  nameInput.type = "text";
  nameInput.value = item.name || "";
  const quantityInput = createField("Ilość", document.createElement("input"));
  quantityInput.type = "number";
  quantityInput.min = "0.01";
  quantityInput.step = "0.01";
  quantityInput.value = String(item.quantity ?? 1);
  const unitInput = createField("Jednostka", document.createElement("select"));
  ["szt", "kg", "g", "l", "ml", "opak"].forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit;
    option.textContent = unit === "g" ? "gramy" : unit === "l" ? "litr" : unit === "ml" ? "mililitry" : unit;
    unitInput.appendChild(option);
  });
  unitInput.value = item.unit || "szt";
  const categoryInput = createField("Kategoria", document.createElement("input"));
  categoryInput.type = "text";
  categoryInput.maxLength = 60;
  categoryInput.value = item.category || "";
  categoryInput.placeholder = "Bez kategorii";
  const datalist = document.createElement("datalist");
  datalist.id = `editor-categories-${item.id}`;
  [...new Set(items.map((entry) => String(entry.category || "").trim()).filter(Boolean))].forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    datalist.appendChild(option);
  });
  categoryInput.setAttribute("list", datalist.id);
  form.appendChild(datalist);
  const photoButton = document.createElement("button");
  photoButton.type = "button";
  photoButton.className = "secondary";
  photoButton.textContent = pendingImage ? "Zmień zdjęcie" : "Dodaj zdjęcie";
  photoButton.addEventListener("click", () => {
    openPhotoSourceMenu((file) => {
      readImageFile(file, (image) => {
        pendingImage = image;
        photoButton.textContent = "Zmień zdjęcie";
      });
    });
  });
  const removePhotoButton = document.createElement("button");
  removePhotoButton.type = "button";
  removePhotoButton.className = "secondary small";
  removePhotoButton.textContent = "Usuń zdjęcie";
  removePhotoButton.addEventListener("click", () => {
    pendingImage = null;
    photoButton.textContent = "Dodaj zdjęcie";
  });
  const actions = document.createElement("div");
  actions.className = "admin-actions";
  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Zapisz";
  saveButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const quantity = Number(quantityInput.value);
    if (!name || !Number.isFinite(quantity) || quantity <= 0) {
      alert("Podaj nazwę i poprawną ilość produktu.");
      return;
    }
    item.name = name;
    item.quantity = Math.max(0.01, Math.round(quantity * 100) / 100);
    item.unit = unitInput.value || "szt";
    item.category = categoryInput.value.trim().slice(0, 60);
    item.image = pendingImage;
    void saveItems();
    renderItems();
    if (pendingImage) {
      void uploadProductImage(item, pendingImage).then(() => renderItems()).catch((error) => console.warn("Zdjęcie pozostanie lokalnie do kolejnej próby:", error));
    }
    overlay.remove();
  });
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "secondary";
  cancelButton.textContent = "Anuluj";
  cancelButton.addEventListener("click", () => overlay.remove());
  actions.append(photoButton, removePhotoButton, saveButton, cancelButton);
  card.append(title, form, actions);
  overlay.appendChild(card);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
  nameInput.focus();
}

function setActiveTab(tab) {
  const nextTab = normalizeTabName(tab);
  if (nextTab === "all" && activeTab !== "all") {
    allProductsLimit = 75;
  }
  activeTab = nextTab;
  localStorage.setItem(getActiveTabStorageKey(), nextTab);
  const canShowAddItemSection = nextTab === "shop" || nextTab === "all";
  tabButtons.forEach((button) => {
    if (button.dataset.tab === "diary") button.classList.toggle("hidden", userSettings.hideDiary === true);
    const isActive = button.dataset.tab === nextTab;
    button.classList.toggle("active", isActive);
  });
  shopTab.classList.toggle("hidden", nextTab !== "shop");
  allTab.classList.toggle("hidden", nextTab !== "all");
  diaryTab?.classList.toggle("hidden", nextTab !== "diary");
  settingsTab?.classList.toggle("hidden", nextTab !== "settings");
  addItemSection?.classList.toggle("hidden", !canShowAddItemSection);

  if (nextTab === "shop" || nextTab === "all" || nextTab === "diary") renderItems();

  if (nextTab === "settings") {
    setSettingsSection(activeSettingsSection);
    fillUserSettingsForm();
    refreshSyncSection();
    setAdminVisibility();
    if (isAdminUser()) {
      setActiveAdminTab(activeAdminTab);
      void loadAirtableConfig();
      void loadAccounts();
    }
  }
}

function resetForm() {
  productName.value = "";
  productQuantity.value = "1";
  productUnit.value = "szt";
  if (productCategory) productCategory.value = "";
  pendingNewItemImage = null;
  productImageButton?.classList.remove("has-image");
  if (productImageButton) productImageButton.title = "Zdjęcie produktu";
}

function addItem() {
  const name = productName.value.trim();
  const rawQuantity = Number(productQuantity.value);
  const quantity = Number.isFinite(rawQuantity) ? Math.max(0.01, Math.round(rawQuantity * 100) / 100) : 1;
  const unit = productUnit.value || "szt";
  const category = productCategory?.value.trim().slice(0, 60) || "";

  if (!name) {
    loginError.textContent = "Wpisz nazwę produktu.";
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    name,
    quantity,
    unit,
    category,
    bought: false,
    selected: false,
    lastQuantity: quantity,
    lastUnit: unit,
    shoppingOwnerLogin: getCurrentUserLogin(),
    shoppingOwnerInitial: getCurrentUserInitial(),
    image: null,
    imageId: null,
  };

  function finalize() {
    items.push(newItem);
    saveItems();
    renderItems();
    resetForm();
    setActiveTab("shop");
  }

  if (pendingNewItemImage) {
    newItem.image = pendingNewItemImage;
    finalize();
    void uploadProductImage(newItem, pendingNewItemImage).then(() => renderItems()).catch((error) => console.warn("Zdjęcie pozostanie lokalnie do kolejnej próby:", error));
  } else {
    finalize();
  }
}

function moveSelectedItemsToPurchased() {
  items.forEach((item) => {
    if (!item.bought && item.selected) {
      item.bought = true;
      item.selected = false;
      item.lastQuantity = item.quantity;
      item.lastUnit = item.unit;
    }
  });
  saveItems();
  renderItems();
}

async function attemptLogin() {
  if (!getActiveFamily()) {
    loginError.textContent = "Najpierw wybierz rodzinę.";
    showFamilyScreen();
    return;
  }

  const loginValue = loginInput.value.trim();
  const passwordValue = loginPasswordInput?.value?.trim() || "";

  if (!loginValue) {
    loginError.textContent = "Wpisz login lub inicjał.";
    return;
  }
  if (!passwordValue) {
    loginError.textContent = "Wpisz hasło.";
    return;
  }

  loginError.textContent = "Logowanie...";

  let accountPayload;
  try {
    const response = await fetch(`${ACCOUNTS_STORAGE_URL}?${getFamilyQueryPart()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ action: "login", username: loginValue, password: passwordValue }),
    });
    accountPayload = await response.json();
    if (!response.ok || !accountPayload.success) {
      if (response.status === 429) throw new Error("Zbyt wiele prób logowania. Spróbuj ponownie później.");
      if (response.status === 403) throw new Error("Dostęp do tej rodziny jest obecnie zablokowany.");
      if (response.status === 401) throw new Error("Nieprawidłowy login lub hasło.");
      throw new Error(accountPayload.error || `Nie udało się zalogować (HTTP ${response.status}).`);
    }
  } catch (error) {
    loginError.textContent = error.message || "Błąd logowania.";
    return;
  }

  currentUser = normalizeUserName(accountPayload.account?.username || loginValue);
  currentAccount = {
    username: currentUser,
    displayName: accountPayload.account?.displayName || "",
    isAdmin: accountPayload.account?.isAdmin === true,
  };
  void rememberOfflineAccess();
  localStorage.removeItem("shoppingLoggedIn");
  localStorage.removeItem("shoppingUser");
  localStorage.removeItem("shoppingIsAdmin");
  localStorage.removeItem("shoppingDisplayName");
  localStorage.removeItem(getSessionFamilyKey());
  localStorage.removeItem("shoppingAdminPassword");
  loginError.textContent = "";
  items = [];
  diaryEntries = [];
  showShopScreen();
  void loadItemsInBackground();
}

function showShopScreen() {
  familyScreen?.classList.add("hidden");
  superAdminScreen?.classList.add("hidden");
  loginScreen.classList.add("hidden");
  shopScreen.classList.remove("hidden");
  userSettingsReady = false;
  setAdminVisibility();
  shoppingSortMode = getStoredShoppingSortMode();
  updateShoppingSortButtonWidth();
  renderItems();
  setActiveTab(getStoredActiveTab());
  updateSyncTimer();
  void checkAirtableConnection();
  void applyGlobalSyncSettings();
}

function showLoginScreen() {
  collapsedCategorySections.clear();
  expandedProductActions.clear();
  familyScreen?.classList.add("hidden");
  superAdminScreen?.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  shopScreen.classList.add("hidden");
  updateLoginFamilyLabel();
  loginInput.value = "";
  if (loginPasswordInput) {
    loginPasswordInput.value = "";
  }
  currentAccount = null;
  userSettingsReady = false;
  shoppingSortMode = "created";
  loginError.textContent = "";
  userSettings = { ...DEFAULT_USER_SETTINGS };
  applyAccountTheme();
  setUserSettingsStatus("");
  setSyncStatus("");
  setConnectionStatus("nie sprawdzono");
  setAccountsStatus("");
  canManageFamilyAdmins = false;
  primaryFamilyAdminUsername = "";
  renderAccounts([]);
  setActiveAdminTab("airtable");
}

familyContinueButton?.addEventListener("click", () => {
  void continueWithFamilySelection();
});
familySelect?.addEventListener("change", () => {
  setFamilyScreenError("");
});
openSuperAdminButton?.addEventListener("click", () => {
  showSuperAdminScreen();
});
superAdminBackButton?.addEventListener("click", () => {
  showFamilyScreen();
});
superAdminCloseButton?.addEventListener("click", () => {
  showFamilyScreen();
});
superAdminLogoutButton?.addEventListener("click", () => {
  void logoutSuperAdmin();
});
superAdminLoginButton?.addEventListener("click", () => {
  void loginSuperAdmin();
});
createFamilyButton?.addEventListener("click", () => {
  void createFamily();
});
changeSuperAdminPasswordButton?.addEventListener("click", () => {
  void changeSuperAdminPassword();
});
changeFamilyButton?.addEventListener("click", () => {
  clearAuthSession();
  showFamilyScreen();
});
familyEditCloseButton?.addEventListener("click", closeFamilyEditModal);
familyEditCancelButton?.addEventListener("click", closeFamilyEditModal);
accountEditCloseButton?.addEventListener("click", closeAccountEditModal);
accountEditCancelButton?.addEventListener("click", closeAccountEditModal);
accountEditSaveButton?.addEventListener("click", () => void saveAccountEdit());
accountEditModal?.addEventListener("click", (event) => {
  if (event.target === accountEditModal) closeAccountEditModal();
});
familyEditSaveButton?.addEventListener("click", () => {
  void saveFamilyEdit();
});
familyEditModal?.addEventListener("click", (event) => {
  if (event.target === familyEditModal) {
    closeFamilyEditModal();
  }
});
loginButton.addEventListener("click", () => {
  void attemptLogin();
});
loginInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void attemptLogin();
  }
});
loginPasswordInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void attemptLogin();
  }
});
logoutButton.addEventListener("click", () => {
  void logoutFromServer();
  clearAuthSession();
  showLoginScreen();
});
addItemButton.addEventListener("click", addItem);
productImageButton?.addEventListener("click", () => {
  openPhotoSourceMenu((file) => {
    readImageFile(file, (image) => {
      pendingNewItemImage = image;
      productImageButton.classList.add("has-image");
      productImageButton.title = "Zdjęcie wybrane — kliknij, aby zmienić";
    });
  });
});
clearPurchasedButton.addEventListener("click", moveSelectedItemsToPurchased);
shopSortToggleButton?.addEventListener("click", toggleShoppingSortMode);
window.addEventListener("resize", updateShoppingSortButtonWidth);
diaryDateInput?.addEventListener("change", () => {
  normalizeDiaryDateInput();
  renderDiaryCard();
});
diaryDateInput?.addEventListener("blur", () => {
  normalizeDiaryDateInput();
  renderDiaryCard();
});
addDiaryEntryButton?.addEventListener("click", () => {
  addDiaryEntry();
});
diaryProductNameInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addDiaryEntry();
  }
});
saveUserSettingsButton?.addEventListener("click", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
  void saveUserSettings();
});
syncModeSelect?.addEventListener("change", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
});
syncWeeksInput?.addEventListener("change", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
});
syncDaysInput?.addEventListener("change", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
});
syncHoursInput?.addEventListener("change", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
});
syncMinutesInput?.addEventListener("change", () => {
  readSyncSettingsFromForm();
  updateSyncTimer();
});
syncNowButton?.addEventListener("click", () => {
  void syncToAirtable(true);
});
darkThemeToggle?.addEventListener("change", () => {
  userSettings = normalizeSettings({ ...userSettings, theme: darkThemeToggle.checked ? "dark" : "light" });
  applyAccountTheme();
});
superAdminAirtableSaveButton?.addEventListener("click", () => void saveSuperAdminAirtableConfig());
superAdminAirtableTestButton?.addEventListener("click", () => void testSuperAdminAirtable());
superAdminSyncSaveButton?.addEventListener("click", () => void saveSuperAdminSyncSettings());
superAdminSyncNowButton?.addEventListener("click", () => void runSuperAdminSync());
familyEditPasswordSaveButton?.addEventListener("click", (event) => {
  event.preventDefault();
  void setFamilyAdminPassword();
});
familyEditAdminPasswordInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void setFamilyAdminPassword();
  }
});
familyEditAdminPasswordConfirmInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void setFamilyAdminPassword();
  }
});
familyEditAdminPasswordToggle?.addEventListener("click", () => togglePasswordField(familyEditAdminPasswordInput, familyEditAdminPasswordToggle));
familyEditAdminPasswordConfirmToggle?.addEventListener("click", () => togglePasswordField(familyEditAdminPasswordConfirmInput, familyEditAdminPasswordConfirmToggle));
changeOwnPasswordButton?.addEventListener("click", () => void changeOwnPassword());
superAdminTabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveSuperAdminTab(button.dataset.superAdminTab || "families"));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const buttons = [...superAdminTabButtons];
    const currentIndex = buttons.indexOf(button);
    const nextIndex = event.key === "ArrowRight"
      ? (currentIndex + 1) % buttons.length
      : (currentIndex - 1 + buttons.length) % buttons.length;
    const next = buttons[nextIndex];
    setActiveSuperAdminTab(next.dataset.superAdminTab || "families");
    next.focus();
  });
});
accountsLoadButton?.addEventListener("click", () => {
  void loadAccounts();
});
productsLoadButton?.addEventListener("click", () => {
  renderProductsData();
});
accountCreateButton?.addEventListener("click", () => {
  void createAccount();
});
accountSetPasswordButton?.addEventListener("click", () => {
  void setAccountPassword();
});
adminTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveAdminTab(button.dataset.adminTab || "airtable");
  });
});
settingsUserTab?.addEventListener("click", () => setSettingsSection("user"));
settingsAdminTab?.addEventListener("click", () => setSettingsSection("admin"));

window.addEventListener("online", () => {
  void trySyncPendingData();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js?v=27").catch((error) => {
      console.warn("Nie udało się zarejestrować trybu offline:", error);
    });
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    void trySyncPendingData();
  } else if (navigator.onLine) {
    void trySyncPendingData();
  }
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

function migrateClientStorage() {
  if (localStorage.getItem("shoppingStorageVersion") === CLIENT_STORAGE_VERSION) {
    return;
  }
  const transientPrefixes = ["shoppingSharedData:", "shoppingPendingSharedSync:", "shoppingDiary:", "shoppingPendingDiarySync:"];
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index) || "";
    if (transientPrefixes.some((prefix) => key.startsWith(prefix))) {
      localStorage.removeItem(key);
    }
  }
  localStorage.setItem("shoppingStorageVersion", CLIENT_STORAGE_VERSION);
}

async function initializeApplication() {
  migrateClientStorage();
  ensureDiaryDateDefault();
  await loadFamilies();

  if (!navigator.onLine && await restoreOfflineAccess()) {
    renderFamilySelectOptions();
    updateLoginFamilyLabel();
    showShopScreen();
    setSyncStatus("Tryb offline — pokazano ostatnio zapisaną listę.", true);
    void loadItemsInBackground();
    return;
  }

  try {
    if (await restoreServerSession()) {
      renderFamilySelectOptions();
      updateLoginFamilyLabel();
      showShopScreen();
      void loadItemsInBackground();
      return;
    }
  } catch {
    // Brak aktywnej sesji lub chwilowy błąd sieci — pokaż bezpieczny ekran logowania.
  }

  if (!navigator.onLine && await restoreOfflineAccess()) {
    showShopScreen();
    setSyncStatus("Tryb offline — pokazano ostatnio zapisaną listę.", true);
    void loadItemsInBackground();
    return;
  }

  const storedFamily = getStoredSelectedFamily();
  if (storedFamily) {
    setSelectedFamily(storedFamily);
    renderFamilySelectOptions();
    updateLoginFamilyLabel();
  }
  clearAuthSession();
  if (!getActiveFamily()) {
    showFamilyScreen();
  } else {
    showLoginScreen();
  }
}

void initializeApplication();
