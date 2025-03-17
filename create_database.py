import sqlite3

def create_database():
    conn = sqlite3.connect("pawconnect.db")
    cursor = conn.cursor()

    # Table for Users (Adopters, Donors, Volunteers)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            user_type TEXT CHECK(user_type IN ('adopter', 'donor', 'volunteer')) NOT NULL
        )
    ''')

    # Table for Animals available for adoption
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT CHECK(gender IN ('Male', 'Female')) NOT NULL,
            species TEXT NOT NULL,
            breed TEXT,
            vaccinated BOOLEAN DEFAULT 0,
            trained BOOLEAN DEFAULT 0,
            description TEXT
        )
    ''')

    # Table for Adoption Requests
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS adoption_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            animal_id INTEGER,
            status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
            request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (animal_id) REFERENCES animals(id)
        )
    ''')

    # Table for Donations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS donations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            amount REAL NOT NULL,
            donation_type TEXT CHECK(donation_type IN ('one-time', 'monthly', 'annually')) NOT NULL,
            donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')

    # Table for Rescue Requests
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rescue_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            media TEXT,
            location TEXT NOT NULL,
            status TEXT CHECK(status IN ('pending', 'in-progress', 'resolved')) DEFAULT 'pending',
            report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')

    conn.commit()
    conn.close()
    print("Database schema created successfully.")

if __name__ == "__main__":
    create_database()
