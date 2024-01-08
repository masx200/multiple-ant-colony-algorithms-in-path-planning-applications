import { ECBasicOption } from "echarts/types/dist/shared";
import { Ref } from "vue";
// import {
ECOption
} from "../functions/echarts-line";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { DefaultOptions } from "./default_Options";
import { get_options_of_random_greedy_of_tsp } from "./get_options_of_random_greedy_of_tsp";
import { get_distance_round } from "./set_distance_round";


export async function generate_greedy_preview_echarts_options({
    selected_node_coordinates,
    node_coordinates
}: {
    selected_node_coordinates: Ref<NodeCoordinates | undefined>;
    node_coordinates:()=>Promise<NodeCoordinates>
}): Promise<ECBasicOption & ECOption> {
    // const element = selecteleref.value;
    // const node_coordinates = TSP_cities_map.get(element?.value || "");
    if (node_coordinates) {
        const selected = await node_coordinates();
        selected_node_coordinates.value = selected;

        const options = await get_options_of_random_greedy_of_tsp({
            node_coordinates: selected,

            round: get_distance_round(),
            max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
        });
        return options;
    } else {
        throw Error("node_coordinates not found");
    }
}
