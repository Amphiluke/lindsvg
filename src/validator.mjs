let messages = {
    AXIOM: "Axiom may only contain the following characters: A..Z,+,-,[,]",
    RULE: "Production rules may only contain the following characters: A..Z,+,-,[,]",
    LETTER: "Allowed alphabet letters are: A..Z",
    ALPHA: "The “alpha” parameter must be a finite number",
    THETA: "The “theta” parameter must be a finite number",
    STEP: "The “step” parameter must be a positive finite number",
    COUNT: "The number of iterations must be integer and finite",
    NUMBER: "A valid finite number expected"
};

let letterRE = /^[A-Z]$/;
export function checkLetter(letter, msg = messages.LETTER) {
    return letterRE.test(letter) || msg;
}

let ruleRE = /^[A-Z+\-[\]]*$/;
export function checkRule(rule, msg = messages.RULE) {
    return ruleRE.test(rule) || msg;
}

export function checkRules(rules, letterMsg, ruleMsg) {
    let errors = new Map();
    Object.entries(rules).forEach(([letter, rule]) => {
        let result = checkLetter(letter, letterMsg);
        if (result === true) {
            result = checkRule(rule, ruleMsg);
        }
        if (result !== true) {
            errors.set(letter, result);
        }
    });
    return errors.size ? errors : true;
}

export function checkStep(step, msg = messages.STEP) {
    return (Number.isFinite(step) && step > 0) || msg;
}

export function checkIterations(iterations, msg = messages.COUNT) {
    return (Number.isInteger(iterations) && iterations > 0) || msg;
}

export function checkAngle(angle, msg = messages.NUMBER) {
    return Number.isFinite(angle) || msg;
}

export function validate(lsParams) {
    let errors = new Map();
    Object.entries(lsParams).forEach(([param, value]) => {
        let result = true;
        switch (param) {
            case "axiom":
                result = checkRule(value, messages.AXIOM);
                break;
            case "rules":
                result = checkRules(value);
                break;
            case "alpha":
            case "theta":
                result = checkAngle(value, messages[param.toUpperCase()]);
                break;
            case "step":
                result = checkStep(value);
                break;
            case "iterations":
                result = checkIterations(value);
                break;
        }
        if (result !== true) {
            errors.set(param, result);
        }
    });
    return errors.size ? errors : true;
}

export function formatErrors(errors) {
    return [...errors].reduce((accumulator, [param, error]) => {
        if (error instanceof Map) {
            return `${accumulator}\n${param}:${formatErrors(error).replace(/\n/g, "\n  ")}`;
        }
        return `${accumulator}\n${param}: ${error}`;
    }, "");
}
