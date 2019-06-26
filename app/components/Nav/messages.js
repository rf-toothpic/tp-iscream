/*
 * Nav Messages
 *
 * This contains all the text for the Nav component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.Nav";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Nav component!"
  }
});
