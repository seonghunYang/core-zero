import { StoryObj } from "@storybook/react";

type StoryObject = { [key: string]: StoryObj };

export type TestStory = StoryObj & {
  name: string;
};

type TestStoryObject<T> = { [k in keyof T]: TestStory };

export function makeStoriesTotestability<T extends StoryObject>(
  stories: T
): TestStoryObject<T> {
  const result: any = {};
  Object.entries(stories).forEach(([name, story]) => {
    result[name] = { ...story, name };
  });

  return result;
}
