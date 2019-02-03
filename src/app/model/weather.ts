export class Weather {
    public time: Date;
    public summary: String = '';
    public icon: String = '';
    public temperature: String = '';
    public isToday = false;
    public getTemperature(): String {
        return this.temperature.length > 0 ? this.temperature + '\xB0F' : '';
    }
}
