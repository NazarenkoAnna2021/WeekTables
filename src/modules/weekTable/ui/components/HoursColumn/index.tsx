import { FC, memo, useMemo } from "react";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { grid } from "../../../utils/gridSizing";

interface IProps {

};

export const HoursColumn: FC<IProps> = memo(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container} >
            {grid.hours.map((item) =>
                <Text key={item} style={styles.text}>{item}</Text>
            )}
        </View>
    );
}); 