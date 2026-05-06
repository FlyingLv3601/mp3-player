import psycopg2
from psycopg2 import OperationalError

def get_all_users():
    # Подключение к БД
    conn_params = {
        'host': 'localhost',
        'port': 5432,
        'database': 'ddb',
        'user': 'lv',
        'password': 'kurwaword'
    }
    
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()
        
        # Достаём всех пользователей
        cur.execute("SELECT id, name, email FROM users;")
        rows = cur.fetchall()
        
        # Выводим
        print("Все пользователи:")
        for row in rows:
            print(f"ID: {row[0]}, Name: {row[1]}, Email: {row[2]}")
        
        cur.close()
        conn.close()
        
    except OperationalError as e:
        print(f"Ошибка: {e}")

# Запуск
get_all_users()