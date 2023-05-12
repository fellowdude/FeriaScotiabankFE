export interface IHTMLText {
  content: string;
}

// TODO more poly instead of nullables
// it's gonna get somewhat messy though
export interface ISimpleCard {
  iconURL?: string; // img url
  url?: string; // actually url attachment
  title: string;
  subtitle?: string;
  color?: string;
  images?: string[];
}

export interface IComplexCard extends ISimpleCard {
  button?: string;
  buttonUrl?: string;
  subButton?: string;
  subButtonUrl?: string;
  description?: {
    title: string;
    text: string;
  };
}

export interface IHomeHero extends IComplexCard {
  middle_images?: string[];
  bottom_images?: string[];
  title_mobile?: string;
}

export interface IAccordion {
  question: string;
  answer: string;
  opened: boolean;
}
