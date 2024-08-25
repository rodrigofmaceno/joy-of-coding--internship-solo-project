import { z } from "zod";

const checkDate = (element: any) => {
    var dd = parseInt(element.slice(3,5));
    var mm = parseInt(element.slice(0,2));
    var yyyy = parseInt(element.slice(6,10));

    var currentDate = new Date();
    
    var date = element.replaceAll("-","");

    if(isNaN(date))
        return false; // "Not a number"
    if(!(mm <= 12 && mm >= 1))
        return false; // "Invalid month"
    if(!(dd <= 31 && dd >= 1))
        return false; // "Invalid day"
    if(!(yyyy >= currentDate.getFullYear() && yyyy <= currentDate.getFullYear()+10))
        return false; // "Invalid year"
    if(!(element[2] === '-' && element[5] === '-'))
        return false; // "Doesn't have dashes"

    return true
};

export const createTaskSchema = z.object({
    
    name: z.string().min(1, 'This field can\'t be empty.').max(191, 'Name is too long.'),
    description: z.string().min(1, 'This field can\'t be empty.'),

    dueDate: z.string().refine(item => checkDate(item), "Date must be in the format MM-DD-YYYY.").and(z.string().max(10, "Date is too long.")),
    category: z.string().max(191, 'Category is too long.'),
});