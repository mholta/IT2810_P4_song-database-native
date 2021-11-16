import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-elements";
import { Chip, HelperText } from "react-native-paper";
import { TextInput } from "../generic/TextInput";

interface ContributorsWithPreviewProps {
  onChangeText: (e: string) => void;
  valueString: string;
  valueList: string[];
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
}

/**
 * A text field for writing contributors separated by new line or comma.
 * Added contributors will be displayed on the right.
 */
const ContributorsWithPreview = ({
  onChangeText,
  id,
  label,
  valueString,
  valueList,
  helperText,
  placeholder,
}: ContributorsWithPreviewProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <TextInput
        label={label}
        placeholder={placeholder}
        multiline
        onChangeText={onChangeText}
        value={valueString}
      />
      <HelperText>{helperText}</HelperText>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {valueList
          .filter((s) => s.trim())
          .map((string, i) => (
            <Chip
              key={label + "-contrib-" + i}
              style={{ backgroundColor: theme.colors?.box }}
            >
              {string}
            </Chip>
          ))}
      </View>
    </View>
  );
};

export default ContributorsWithPreview;
