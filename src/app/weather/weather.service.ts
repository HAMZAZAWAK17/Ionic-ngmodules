import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbName: string = 'weather_db';

  constructor() {
    this.initDatabase();
  }

  async initDatabase() {
    try {
      const platform = Capacitor.getPlatform();
      
      // On web, we might need different logic, but for simplicity we focus on the core SQLite usage
      this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await this.db.open();

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS weather_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          city TEXT,
          country TEXT,
          temperature REAL,
          pressure REAL,
          humidity REAL
        );
      `;
      await this.db.execute(createTableQuery);
      console.log('Database and table weather_data initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async saveWeather(data: any) {
    if (!this.db) await this.initDatabase();
    
    try {
      const query = `INSERT INTO weather_data (city, country, temperature, pressure, humidity) VALUES (?, ?, ?, ?, ?)`;
      const params = [
        data.name,
        data.sys.country,
        data.main.temp,
        data.main.pressure,
        data.main.humidity
      ];
      
      await this.db.run(query, params);
      console.log('Weather data saved to history');
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  }

  async getHistory() {
    if (!this.db) await this.initDatabase();

    try {
      const query = `SELECT * FROM weather_data ORDER BY id DESC`;
      const res = await this.db.query(query);
      return res.values || [];
    } catch (error) {
      console.error('Error fetching history:', error);
      return [];
    }
  }

  async clearHistory() {
    if (!this.db) await this.initDatabase();
    
    try {
      const query = `DELETE FROM weather_data`;
      await this.db.execute(query);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
}
