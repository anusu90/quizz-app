import React from "react";

export interface ButtonPropsModel extends React.HTMLProps<HTMLButtonElement> {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}
