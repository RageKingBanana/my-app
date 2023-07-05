import { SensorDataValues, UserData } from "src/app/logs/logs.component";

export interface FilteredLogsData
{
	key?: string,
	sensorDataValues: SensorDataValues,
	timestamp?: number | string,
	userData: UserData[]
}
