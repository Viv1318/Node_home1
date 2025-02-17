function solutionOfQuadraticEquations(a, b, c) {
    let discriminant = b * b - 4 * a * c;
    let x1, x2;
    if (a !=0) {
        if (discriminant > 0) {
            x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            console.log(`Уравнение имеет два различных корня: ${x1} и ${x2}`);
        } else if (discriminant === 0) {
            x1 = x2 = -b / (2 * a);
            console.log(`Уравнение имеет единственный корень ${x1}`);
        } else {
            console.log("Уравнение не имеет корней");
        }
    } else {
        console.log("Уравнение не является квадратным");
    }
    
        
}


module.exports = {solutionOfQuadraticEquations};