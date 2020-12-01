// egendefiner måte å handle errors på utåver det som er innebygget i node
// bruker class for å kunne arve fra default error i node
export default class ErrorHandler extends Error {
    constructor(message, statusCode){
        // innebygget error tar bare en message, så vi sender message dit
        super(message); 
        this.statusCode = statusCode;
        // hinder at denne erroren dukker opp i stacTracen, er ikke nødvendig, men får "penere" error
        Error.captureStackTrace(this, this.constructer); 
    }

};