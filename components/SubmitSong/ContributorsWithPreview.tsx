import React from "react";
import { View } from "react-native";
import { TextInput, Chip, HelperText } from "react-native-paper";

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
        {valueList.map((string, i) => string.trim() && <Chip>{string}</Chip>)}
      </View>
    </View>
  );
};

export default ContributorsWithPreview;
