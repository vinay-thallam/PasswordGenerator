import React from "react";

import { Card, StyledBody, StyledAction } from "baseui/card";
import { Input } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { Accordion, Panel } from "baseui/accordion";
import { Block } from "baseui/block";
import { Slider } from "baseui/slider";
import { FormControl } from "baseui/form-control";
import { useStyletron } from "baseui";

const Markup = () => {
  const [useCss, theme] = useStyletron();
  return (
    <Card
      overrides={{
        Root: {
          style: {
            left: "50%",
            maxWidth: "420px",
            position: "absolute",
            top: "20px",
            transform: "translate(-50%, 0)",
            width: "95vw"
          }
        }
      }}
    >
      <StyledBody>
        <Input
          onChange={event => {}}
          overrides={{
            InputContainer: {
              style: ({ $theme }) => ({
                borderColor: $theme.colors.primary50,
                borderWidth: $theme.sizing.scale100
              })
            },
            After: () => (
              <Button
                kind={KIND.minimal}
                shape={SHAPE.square}
                onClick={() => {}}
              >
                <svg
                  className={useCss({
                    height: theme.sizing.scale800,
                    width: theme.sizing.scale800
                  })}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#aaaaaa"
                    d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
                  />
                </svg>
              </Button>
            )
          }}
        />
      </StyledBody>
      <StyledAction>
        <div className={useCss({ marginBottom: theme.sizing.scale800 })}>
          <Button
            onClick={() => {}}
            overrides={{
              BaseButton: {
                style: () => ({
                  width: "100%"
                })
              }
            }}
          >
            Copy
          </Button>
        </div>
        <Accordion>
          <Panel title="Options">
            <Block marginBottom="scale800">
              <FormControl label="Length">
                <Slider
                  min={4}
                  max={64}
                  value={30}
                  onChange={({ value }) => {}}
                />
              </FormControl>
            </Block>
            <Block>
              <FormControl label="Characters">
                <div>
                  <Checkbox checked={true} onChange={() => {}}>
                    A-Z
                  </Checkbox>
                  <Checkbox checked={true} onChange={() => {}}>
                    0-9
                  </Checkbox>
                  <Checkbox checked={false} onChange={() => {}}>
                    %@#
                  </Checkbox>
                </div>
              </FormControl>
            </Block>
          </Panel>
        </Accordion>
      </StyledAction>
    </Card>
  );
};

export default Markup;
