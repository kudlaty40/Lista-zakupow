<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');
appRequireSameOriginForWrite(); appRequireSuperAdmin();
$path = dirname(__DIR__, 2) . '/app-private/config.php';
$private = appPrivateConfig();
$defaults = ['api_key'=>'','base_id'=>'','table_name'=>'shopping_list','user_field'=>'user','data_field'=>'data','updated_field'=>'updated_at'];
$current = array_merge($defaults, appAirtableConfig());
if ($_SERVER['REQUEST_METHOD'] === 'GET') { $public=$current; $public['api_key']=''; $public['has_api_key']=$current['api_key']!==''; echo json_encode(['success'=>true,'config'=>$public],JSON_UNESCAPED_UNICODE); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') appJsonError(405,'Dozwolony jest wyłącznie GET lub POST.');
$payload=json_decode(file_get_contents('php://input')?:'',true); if(!is_array($payload)) appJsonError(400,'Nieprawidłowe dane JSON.');
$next=$current; foreach(['base_id','table_name','user_field','data_field','updated_field'] as $field) if(array_key_exists($field,$payload)) $next[$field]=trim((string)$payload[$field]);
if(array_key_exists('api_key',$payload)&&trim((string)$payload['api_key'])!=='')$next['api_key']=trim((string)$payload['api_key']);
if($next['base_id']===''||$next['table_name']==='')appJsonError(400,'Base ID i nazwa tabeli są wymagane.');
$private['airtable']=$next; appBackupBeforeMutation('airtable-config');
if(!appAtomicWrite($path,"<?php\nreturn ".var_export($private,true).";\n"))appJsonError(500,'Nie udało się zapisać konfiguracji Airtable.');
$public=$next;$public['api_key']='';$public['has_api_key']=true;echo json_encode(['success'=>true,'config'=>$public],JSON_UNESCAPED_UNICODE);
