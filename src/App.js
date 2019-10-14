import React, { useState, useRef, useEffect } from "react";

import { Button, KIND, SHAPE } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Slider } from "baseui/slider";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { Checkbox } from "baseui/checkbox";
import { Accordion, Panel } from "baseui/accordion";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";

import zxcvbn from "zxcvbn";
import { generate as generatePassword } from "generate-password";
import copy from "copy-to-clipboard";

const getStrengthColor = strength => {
  switch (strength) {
    case 0:
      return "negative400";
    case 1:
      return "warning400";
    case 2:
      return "rating400";
    case 3:
      return "positive200";
    case 4:
      return "positive400";
    default:
      return "primary50";
  }
};

const App = () => {
  const [length, setLength] = useState(32);
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState(false);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(null);
  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    copy(password);
    setCopied(true);
  };

  const setNewPassword = p => {
    const newPassword = p
      ? p
      : generatePassword({ length, numbers, uppercase, symbols });
    const { score } = zxcvbn(newPassword);
    setStrength(score);
    setCopied(false);
    setPassword(newPassword);
  };

  useEffect(() => {
    setNewPassword();
  }, [length, uppercase, symbols, numbers]);

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
          ref={passwordRef}
          value={password}
          onChange={event => setNewPassword(event.target.value)}
          overrides={{
            InputContainer: {
              style: ({ $theme }) => ({
                borderColor: $theme.colors[getStrengthColor(strength)],
                borderWidth: $theme.sizing.scale100
              })
            },
            After: () => (
              <Button
                kind={KIND.minimal}
                shape={SHAPE.square}
                onClick={() => setNewPassword()}
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
            onClick={copyToClipboard}
            overrides={{
              BaseButton: {
                style: () => ({
                  width: "100%"
                })
              }
            }}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <Accordion>
          <Panel title="Options">
            <Block marginBottom="scale800">
              <FormControl label="Length">
                <Slider
                  min={4}
                  max={64}
                  value={[length]}
                  onChange={({ value }) => setLength(value[0])}
                />
              </FormControl>
            </Block>
            <Block>
              <FormControl label="Characters">
                <div>
                  <Checkbox
                    checked={uppercase}
                    onChange={() => setUppercase(!uppercase)}
                  >
                    A-Z
                  </Checkbox>
                  <Checkbox
                    checked={numbers}
                    onChange={() => setNumbers(!numbers)}
                  >
                    0-9
                  </Checkbox>
                  <Checkbox
                    checked={symbols}
                    onChange={() => setSymbols(!symbols)}
                  >
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

export default App;
