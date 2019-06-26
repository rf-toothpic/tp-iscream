/**
 *
 * Asynchronously loads the component for Leaderboard
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
