import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { addDecorator } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator(withKnobs);
