import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";

export type PickNextNodeRouletteOptions = {
    getpheromone: GetPheromone;
    // nextnode: number;
    currentnode: number;
    alpha_zero: number;
    end: number;
    getdistancebyserialnumber: GetDistanceBySerialNumber;
    beta_zero: number;
    availablenextnodes: number[];
};
