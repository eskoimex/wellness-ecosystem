class Ads {
    constructor(id, name, details, reservationtime, file,
        ad_package, initial_cost, duration, location, displays, amount ) {
            this.id = id;
            this.name = name;
            this.details = details;
            this.reservationtime = reservationtime;
            this.file = file;
            this.ad_package = ad_package;
            this.initial_cost = initial_cost;
            this.duration = duration;
            this.location = location;
            this.displays = displays;
            this.amount = amount;
    }
}


module.exports =  Ads ;