import { it } from "vitest";
import { test_population_relative_information_entropy } from "../test/test-population-relative-information-entropy";
import { testpathsequalinbothdirections } from "../test/testpathsequalinbothdirections";
import { testrobustsegmentintersect } from "../test/testrobustsegmentintersect";

// import { testgeteuclideandistance } from "../test/testgeteuclideandistance";

it("main test functions-2", () => {
    // testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    test_population_relative_information_entropy();
});
