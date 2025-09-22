import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { selectThemeColors } from "../../../redux/theme/selectors";
import { useSelector } from "react-redux";
import { fonts } from "../../../constants/fonts";

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  ctiveColor?: string;
  inactiveColor?: string;
  headerBackgroundColor?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,  
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  header: {
    height: 35,
    justifyContent: "center",
  },
  headerContent: {
    alignItems: "center",
    
  },
  tabButton: {    
    paddingHorizontal: 16,
    paddingVertical: 8,    
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabTitle: {    
    fontSize: 16,
    color: color.senary,
    fontFamily: fonts.MontserratMedium
  },
  content: {
    flex: 1,    
  },
});

  return (
    <View style={{ flex: 1 }}>
      {/* Tab headings */}
      <View style={styles.header}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerContent}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(index)}
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    activeTab === index ?color.secondary : color.tertiary,
                },
              ]}
            >
              <Text style={styles.tabTitle}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content of the active tab  */}
      <View style={styles.content}>{tabs[activeTab].content}</View>
    </View>
  );
};

export default Tabs;


