import React from "react";
import { Input, Button, Icon } from "react-materialize";

export default props => {
  const { name, placeholder, label, type, disabled, value } = props;
  return (
    <React.Fragment>
      {disabled ? (
        <Input
          placeholder={placeholder}
          label={label}
          name={name}
          type={type}
          value={value}
          disabled="disabled"
        >
          {name}
        </Input>
      ) : (
        <Input
          placeholder={placeholder}
          label={label}
          type={type}
          name={name}
          value={value}
          onChange={props.handleChange}
        >
          {props.activeCell === props.thisCell
            ? props.type === "select"
              ? props.children
              : null
            : null}
        </Input>
      )}
      {props.activeCell === props.thisCell ? (
        <Button
          style={{ display: "inline" }}
          onClick={e => props.handleEdit(e, props.thisCell)}
        >
          <Icon>save</Icon>
        </Button>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
