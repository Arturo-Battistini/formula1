export interface Circuit {
  _id: string;
  name: string;
  country: string;
  city: string;
  length: number;
  corners: number;
  recordLapTime: string;
  recordHolder: string;
  recordYear: number;
  builtYear: number;
  capacity: number;
  isActive: boolean;
  firstGrandPrix: number;
  circuitType: string;
  description: string;
  imageUrl: string;
}

export interface Pilot {
  _id: string;
  name: string;
  surname: string;
  nationality: string;
  dateOfBirth: string;
  number: number;
  isActive: boolean;
  currentTeam: {
    _id: string;
    name: string;
    nationality: string;
  };
  championshipPoints: number;
  raceWins: number;
  podiums: number;
  polePositions: number;
  fastestLaps: number;
  helmetColor: string;
  imageUrl: string;
  sprintWins: number;
  sprintPolePositions: number;
  sprintPodiums: number;
  sprintPoints: number;
  sprintFastestLaps: number;
  sprintParticipations: number;
}
export interface Team {
  _id: string;
  name: string;
  nationality: string;
  constructorsChampionships: number;
  driversChampionships: number;
  engine: string;
  fastestLaps: number;
  foundedYear: number;
  headquarters: string;
  isActive: boolean;
  polePositions: number;
  primaryColor: string;
  raceWins: number;
  secondaryColor: string;
  teamPrincipal: string;
  team: string;
  logo: string;

}
export interface Tire {
  _id: string;
  name: string;
  compound: string;
  type: string;
  color: string;
  description: string;
  durability: number;
  grip: number;
  isActive: boolean;
  manufacturer: string;
  optimalTemperature: number;
  season: number;
  temperatureRange: {
    min: number;
    max: number;
  };
  usageConditions: string;
  imageUrl: string;
}

export interface Driver {
  firstName: string;
  lastName: string;
  number: number;
  flag: string;
  image: string;
  teamName: string;
}
