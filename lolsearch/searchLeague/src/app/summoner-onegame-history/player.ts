import { Players } from './players';
import { Team } from './team';
import { Detail } from './detail';
export interface Player{
	gameMode: string;
	participantIdentities: Array<Players>;
	teams: Array<Team>;
	participants: Array<Detail>;
}