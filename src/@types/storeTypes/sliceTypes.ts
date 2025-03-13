// toggle @types
export type TAnchor = {
  right: boolean;
};

export interface toggleState {
  modal: boolean;
  snack: boolean;
  anchor: TAnchor;
}

// user @type

export type TuserData = {
  _id: string;
  name: string;
  email: string;
};

export interface userStateState {
  user: TuserData | null;
}

// apiResponse @type

export interface apiResponseState {
  resMessage: string;
  error: boolean;
}
