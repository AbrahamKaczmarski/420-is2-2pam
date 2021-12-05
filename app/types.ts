export type Campaign = {
  title: string;
  levels: {
    id: number;
    location: string;
    story: {
      text: string;
    }[];
    choices: {
      destination: number;
      description: string;
    }[];
  }[];
};

export type Choice = {
  description: string;
  destination: number;
};
