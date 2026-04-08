import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import {
  sunnyOutline,
  cloudOutline,
  rainyOutline,
  thunderstormOutline,
  snowOutline,
  waterOutline,
  cloudyOutline,
  eyeOffOutline,
  eyeOutline,
  searchOutline,
  locationOutline,
  thermometerOutline,
  waterOutline as humidityIcon,
  speedometerOutline,
  arrowBackOutline,
  refreshOutline,
  sunny,
  moonOutline,
  cloudy,
  compassOutline,
  navigateCircleOutline,
  sunnyOutline as sunriseIcon,
  moonOutline as sunsetIcon,
  thermometerOutline as tempMinMax
} from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: false,
})
export class WeatherPage {
  cityInput: string = '';
  weatherData: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  flagUrl: string = '';

  private apiKey = '5f3f333caf1e7b78573486f0db732228';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {
    addIcons({
      sunnyOutline,
      cloudOutline,
      rainyOutline,
      thunderstormOutline,
      snowOutline,
      waterOutline,
      cloudyOutline,
      eyeOffOutline,
      eyeOutline,
      searchOutline,
      locationOutline,
      thermometerOutline,
      humidityIcon,
      speedometerOutline,
      arrowBackOutline,
      refreshOutline,
      sunny,
      moonOutline,
      cloudy,
      compassOutline,
      navigateCircleOutline,
      'sunrise-icon': sunriseIcon,
      'sunset-icon': sunsetIcon,
      'temp-min-max': tempMinMax
    });
  }

  searchWeather() {
    if (!this.cityInput.trim()) return;

    this.isLoading = true;
    this.weatherData = null;
    this.errorMessage = '';
    this.flagUrl = '';

    const url = `${this.apiUrl}?q=${encodeURIComponent(this.cityInput)}&appid=${this.apiKey}&units=metric&lang=fr`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        
        // Correction territoriale explicite
        let countryCode = data.sys.country;
        const cityName = data.name ? data.name.toLowerCase() : '';
        
        if (cityName.includes('dakhla') || cityName.includes('laayoune')) {
          countryCode = 'MA';
        } else if (cityName.includes('jerusalem') || cityName.includes('qods') || cityName.includes('quds')) {
          countryCode = 'PS';
          data.name = 'Al Qods'; // Renommer pour l'affichage
        }
        
        this.flagUrl = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMessage = 'Ville introuvable. Vérifiez le nom et réessayez.';
        } else if (err.status === 401) {
          this.errorMessage = 'Clé API invalide ou non activée. Veuillez vérifier votre clé OpenWeatherMap.';
        } else {
          this.errorMessage = 'Erreur de connexion. Réessayez plus tard.';
        }
      }
    });
  }

  getWeatherIcon(weatherId: number): string {
    if (weatherId >= 200 && weatherId < 300) return 'thunderstorm-outline';
    if (weatherId >= 300 && weatherId < 500) return 'water-outline';
    if (weatherId >= 500 && weatherId < 600) return 'rainy-outline';
    if (weatherId >= 600 && weatherId < 700) return 'snow-outline';
    if (weatherId >= 700 && weatherId < 800) return 'eye-off-outline';
    if (weatherId === 800) return 'sunny-outline';
    if (weatherId > 800) return 'cloud-outline';
    return 'cloudy-outline';
  }

  getWeatherGradient(weatherId: number): string {
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rainy';
    if (weatherId >= 600 && weatherId < 700) return 'snowy';
    if (weatherId >= 700 && weatherId < 800) return 'foggy';
    if (weatherId === 800) return 'sunny';
    if (weatherId > 800) return 'cloudy';
    return 'sunny';
  }

  getWindDirection(deg: number): string {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    return dirs[Math.round(deg / 45) % 8];
  }

  formatTime(unix: number, timezone: number): string {
    const date = new Date((unix + timezone) * 1000);
    return date.toUTCString().slice(17, 22);
  }
}
