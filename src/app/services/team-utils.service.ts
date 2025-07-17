import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamUtilsService {

  private teamColors: Record<string, string> = {
    'alpine': '#005081',
    'aston martin': '#00482C',
    'ferrari': '#710006',
    'haas': '#4D5052',
    'kick sauber': '#006300',
    'mclaren': '#863400',
    'mercedes': '#007560',
    'racing bulls': '#2345AB',
    'red bull racing': '#003282',
    'williams': '#000681'
  };
  getTeamBackgroundColor3(teamName: string): string {
    const teamColors: Record<string, string> = {
      'alpine': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'aston martin': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'ferrari': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'haas': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'kick sauber': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'mclaren': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'mercedes': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'racing bulls': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'red bull racing': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'williams': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
    };
    const normalizedName = teamName.toLowerCase().trim();
    return teamColors[normalizedName] || 'transparent'; // Color por defecto si no se encuentra
  }

  private pilotGradients: Record<string, string> = {
    'franco-colapinto': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
    'pierre-gasly': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
    'fernando-alonso': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
    'lance-stroll': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
    'lewis-hamilton': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
    'charles-leclerc': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
    'esteban-ocon': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
    'ollie-bearman': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
    'nico-hulkenberg': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
    'gabriel-bortoleto': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
    'oscar-piastri': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
    'lando-norris': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
    'kimi-antonelli': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
    'george-russell': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
    'liam-lawson': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
    'isack-hadjar': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
    'max-verstappen': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
    'yuki-tsunoda': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
    'alexander-albon': 'linear-gradient(to bottom, #000681, #000566, #00034a)',
    'carlos-sainz': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
  };

  private pilotImageMap: Record<string, { directory: string, filename: string }> = {
    'franco-colapinto': { directory: 'alpine', filename: '2025alpinefracol01right.avif' },
    'pierre-gasly': { directory: 'alpine', filename: '2025alpinepiegas01right.avif' },
    'fernando-alonso': { directory: 'aston', filename: '2025astonmartinferalo01right.avif' },
    'lance-stroll': { directory: 'aston', filename: '2025astonmartinlanstr01right.avif' },
    'lewis-hamilton': { directory: 'ferarri', filename: '2025ferrarilewham01right.avif' },
    'charles-leclerc': { directory: 'ferarri', filename: '2025ferrarichalec01right.avif' },
    'esteban-ocon': { directory: 'haas', filename: '2025haasestoco01right.avif' },
    'ollie-bearman': { directory: 'haas', filename: '2025haasolibea01right.avif' },
    'nico-hulkenberg': { directory: 'sauber', filename: '2025kicksaubernichul01right.avif' },
    'gabriel-bortoleto': { directory: 'sauber', filename: '2025kicksaubergabbor01right.avif' },
    'oscar-piastri': { directory: 'mclaren', filename: '2025mclarenoscpia01right.avif' },
    'lando-norris': { directory: 'mclaren', filename: '2025mclarenlannor01right.avif' },
    'kimi-antonelli': { directory: 'mercedes', filename: '2025mercedesandant01right.avif' },
    'george-russell': { directory: 'mercedes', filename: '2025mercedesgeorus01right.avif' },
    'liam-lawson': { directory: 'racingbull', filename: '2025racingbullslialaw01right.avif' },
    'isack-hadjar': { directory: 'racingbull', filename: '2025racingbullsisahad01right.avif' },
    'max-verstappen': { directory: 'redbull', filename: '2025redbullracingmaxver01right.avif' },
    'yuki-tsunoda': { directory: 'redbull', filename: '2025redbullracingyuktsu01right.avif' },
    'alexander-albon': { directory: 'williams', filename: '2025williamsalealb01right.avif' },
    'carlos-sainz': { directory: 'williams', filename: '2025williamscarsai01right.avif' }
  };

  getTeamBackgroundColor(teamName: string): string {
    const normalizedName = teamName.toLowerCase().trim();
    return this.teamColors[normalizedName] || '#ffffff';
  }

  getPilotBackgroundColor(pilotName: string): string {
    const normalizedName = pilotName.toLowerCase().trim();
    return this.pilotGradients[normalizedName] || 'transparent';
  }

  getPilotImage(pilotName: string): string {
    const normalizedName = pilotName.toLowerCase().trim();
    const pilotConfig = this.pilotImageMap[normalizedName];

    if (pilotConfig) {
      return `assets/teams/${pilotConfig.directory}/${pilotConfig.filename}`;
    }

    return 'assets/teams/mercedes/2025mercedesgeorus01right.avif';
  }

  getTeamBackgroundColor2(pilotName: string): string {
    const pilotGradients: Record<string, string> = {
      'franco-colapinto': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'pierre-gasly': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'fernando-alonso': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'lance-stroll': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'lewis-hamilton': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'charles-leclerc': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'esteban-ocon': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'ollie-bearman': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'nico-hulkenberg': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'gabriel-bortoleto': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'oscar-piastri': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'lando-norris': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'kimi-antonelli': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'george-russell': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'liam-lawson': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'isack-hadjar': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'max-verstappen': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'yuki-tsunoda': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'alexander-albon': 'linear-gradient(to bottom, #000681, #000566, #00034a)',
      'carlos-sainz': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
    };
    const normalizedName = pilotName.toLowerCase().trim();
    return pilotGradients[normalizedName] || 'transparent';
  }
}
