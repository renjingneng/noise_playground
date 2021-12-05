function clamp(input,min,max){
    var output;
    if(input <min){
        output = min;
    }else if(input >max){
        output = max;
    }else{
        output = input;
    }
    return output;
}
function percentage_with_clamp(input,min,max){
    var  output = clamp(input,min,max);
    return (output-min)/(max-min);
}
export {clamp,percentage_with_clamp};