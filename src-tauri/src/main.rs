// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use tauri::generate_handler;

#[tauri::command]
fn create() -> String {
    "Ресурс успешно создан!".to_string()
}


fn main() {
  // app_lib::run();

  tauri::Builder::default()
  .invoke_handler(generate_handler![create])
  .run(tauri::generate_context!())
  .expect("Ошибка при запуске приложения");
}
