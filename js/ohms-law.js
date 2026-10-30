// Given exactly two of V, I, R, P, work out the other two.
(function () {
  var names = {
    v: { label: "Voltage", unit: "V" },
    i: { label: "Current", unit: "A" },
    r: { label: "Resistance", unit: "Ω" },
    p: { label: "Power", unit: "W" }
  };

  // Key = the two known values, in alphabetical order. Each entry gives the formula text
  // and the calculation for each of the other two values.
  var rules = {
    "iv": { r: ["R = V ÷ I", function (x) { return x.v / x.i; }],
            p: ["P = V × I", function (x) { return x.v * x.i; }] },
    "rv": { i: ["I = V ÷ R", function (x) { return x.v / x.r; }],
            p: ["P = V² ÷ R", function (x) { return x.v * x.v / x.r; }] },
    "ir": { v: ["V = I × R", function (x) { return x.i * x.r; }],
            p: ["P = I² × R", function (x) { return x.i * x.i * x.r; }] },
    "pv": { i: ["I = P ÷ V", function (x) { return x.p / x.v; }],
            r: ["R = V² ÷ P", function (x) { return x.v * x.v / x.p; }] },
    "ip": { v: ["V = P ÷ I", function (x) { return x.p / x.i; }],
            r: ["R = P ÷ I²", function (x) { return x.p / (x.i * x.i); }] },
    "pr": { v: ["V = √(P × R)", function (x) { return Math.sqrt(x.p * x.r); }],
            i: ["I = √(P ÷ R)", function (x) { return Math.sqrt(x.p / x.r); }] }
  };

  var order = ["v", "i", "r", "p"];
  var inputs = {};
  order.forEach(function (key) {
    inputs[key] = document.getElementById(key);
    inputs[key].addEventListener("input", calculate);
  });
  var result = document.getElementById("result");

  document.getElementById("ohm-form").addEventListener("submit", function (e) {
    e.preventDefault();
  });
  document.getElementById("clear").addEventListener("click", function () {
    order.forEach(function (key) { inputs[key].value = ""; });
    calculate();
  });

  function format(n) {
    return String(Number(n.toPrecision(6)));
  }

  function message(text, isError) {
    result.className = isError ? "result error" : "result";
    result.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = text;
    result.appendChild(p);
  }

  function calculate() {
    var known = {};
    var keys = [];
    order.forEach(function (key) {
      if (inputs[key].value.trim() !== "") {
        known[key] = Number(inputs[key].value);
        keys.push(key);
      }
    });

    if (keys.length < 2) {
      message("Enter two values to see the result.", false);
      return;
    }
    if (keys.length > 2) {
      message("You have filled in " + keys.length + " boxes. Leave exactly two filled and clear the rest.", true);
      return;
    }
    for (var k = 0; k < keys.length; k++) {
      if (!isFinite(known[keys[k]]) || known[keys[k]] < 0) {
        message("Please use numbers that are zero or more.", true);
        return;
      }
    }

    var rule = rules[keys.sort().join("")];
    var all = {};
    var formulas = [];
    var failed = false;
    keys.forEach(function (key) { all[key] = known[key]; });
    Object.keys(rule).forEach(function (key) {
      var value = rule[key][1](known);
      if (!isFinite(value)) {
        failed = true;
      }
      all[key] = value;
      formulas.push(rule[key][0]);
    });

    if (failed) {
      message("That pair can't be worked out because it would need dividing by zero. Try a value above zero.", true);
      return;
    }

    result.className = "result";
    result.innerHTML = "";
    var list = document.createElement("dl");
    order.forEach(function (key) {
      var dt = document.createElement("dt");
      dt.textContent = names[key].label + " (" + key.toUpperCase() + ")";
      var dd = document.createElement("dd");
      dd.textContent = format(all[key]) + " " + names[key].unit;
      list.appendChild(dt);
      list.appendChild(dd);
    });
    result.appendChild(list);

    var used = document.createElement("p");
    used.textContent = "Formulas used: ";
    var formula = document.createElement("span");
    formula.className = "formula";
    formula.textContent = formulas.join(", ");
    used.appendChild(formula);
    result.appendChild(used);
  }
})();
