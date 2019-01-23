import { FormGroup, FormControl } from "../../../node_modules/@angular/forms";
import { RankInfo } from './rankinfo';

export interface LOLUserData {
  profileIconId: number;
  name: string;
  puuid:	string
  summonerLevel: number;
  revisionDate: number;
  id: string;
  accountId: number;
  profileimg: string;
  searchForm: FormGroup;
  searchControl: FormControl;
  rank: RankInfo;

}