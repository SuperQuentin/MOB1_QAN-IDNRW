import React, { Component, ReactNode } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as SecureStore from "expo-secure-store";
import getReports from "../api/getReports";

import Reports from "../components/Reports";
import { UserContext } from "../contexts/userContext";
import DrugsReportScreen from "../screens/Reports/Drug";
import ShiftsReportScreen from "../screens/Reports/Shift";

export interface ReportsTopTabProps {
  children?: ReactNode;
}

export type ReportsTopTabParamList = {
  Shift: { data: [] | null };
  Drug: { data: [] | null };
};

const Tab = createMaterialTopTabNavigator<ReportsTopTabParamList>();

export default class ReportsTopTabNavigator extends Component<ReportsTopTabProps> {
  static contextType = UserContext;

  constructor(props: ReportsTopTabProps) {
    super(props);
    this.state = {
      reports: null,
    };
  }

  async componentDidMount() {
    let reports = await getReports(this.context.token);
    this.setState({
      reports: reports,
    });
    console.log(this.state.reports);
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Shift"
          component={ShiftsReportScreen}
          options={{ title: "Shift" }}
        />
        <Tab.Screen
          name="Drug"
          component={DrugsReportScreen}
          options={{ title: "Drug" }}
        />
      </Tab.Navigator>
    );
  }
}
