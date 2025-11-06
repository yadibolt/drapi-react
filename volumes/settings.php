<?php

$databases = [];

$settings['hash_salt'] = 'zfmzvo4QN-gIhXT0VdiXHGAgAIbZrOjk3oHi0tqGCMMV6vz4LlQXvi769em9JQytgvPyExQdvg';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

$settings['entity_update_batch_size'] = 50;
$settings['entity_update_backup'] = TRUE;
$settings['migrate_node_migrate_type_classic'] = FALSE;

if (file_exists($app_root . '/sites/settings.local.php')) {
  include $app_root . '/sites/settings.local.php';
}

#drapireact@dev.com
#Drapiadmin1@

$databases['default']['default'] = array (
  'database' => "drapi_react",
  'username' => '',
  'password' => '',
  'prefix' => '',
  'host' => 'localhost',
  'port' => 5432,
  'namespace' => 'Drupal\\Core\\Database\\Driver\\pgsql',
  'driver' => 'pgsql',
);

$settings['cache']['bins']['bootstrap'] = 'cache.backend.apcu';
$settings['cache']['bins']['drapi'] = 'cache.backend.apcu';
$settings['cache']['bins']['drapi_cache_tags'] = 'cache.backend.apcu';

$settings['config_sync_directory'] = 'sites/default/files/config_GkQ8EGpaPKoQE1qnegvFiqko32jQ0Ee6Nj7gVDBrdjJmhsU7hjt_kQaBRBC_pDrgEVE7rAtMMg/sync';

$settings['file_temp_path'] = "/tmp";
$settings['file_private_path'] = 'sites/default/files/private';

$settings['trusted_host_patterns'] = [
  '^api.drapireact.loc$',
  '^localhost$',
];
