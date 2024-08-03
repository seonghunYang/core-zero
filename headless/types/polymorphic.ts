import React from "react";

export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicComponentPropsWithoutRef<
  T extends React.ElementType,
  Props = {},
> = AsProp<T> & React.ComponentPropsWithoutRef<T> & Props;

export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = {},
> = PolymorphicComponentPropsWithoutRef<T, Props> & {
  ref?: PolymorphicRef<T>;
};
