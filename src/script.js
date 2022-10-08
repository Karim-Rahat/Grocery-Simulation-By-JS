let customers = [];
let totalCustomer = 0,
  totalIAT = 0,
  totalST = 0,
  totalWT = 0,
  totalTSS = 0,
  totalIdle = 0;
totalNumOfCustWait_in_queue = 0;
lastElOfTse = 0;
totalAt = 0;

function customer() {
  return {
    customerNo: 0,
    randomIAT: 0,
    iat: 0,
    arrival_time: 0,
    random_service_time: 0,
    service_time: 0,
    time_service_begin: 0,
    waiting_time: 0,
    time_service_ends: 0,
    time_spent_in_system: 0,
    idle_time_of_server: 0,
  };
}

function heading() {
  return {
    cust_No: 0,
    RIAT: 0,
    IAT: 0,
    AT: 0,
    RST: 0,
    ST: 0,
    TSB: 0,
    WT: 0,
    TSE: 0,
    TSS: 0,
    ITS: 0,
  };
}


const getSize = () => {
  const  contentDiv=document.getElementById("contentDiv")
  console.log( contentDiv);

  (totalCustomer = 0),
    (totalIAT = 0),
    (totalST = 0),
    (totalWT = 0),
    (totalTSS = 0),
    (totalIdle = 0);
  totalNumOfCustWait_in_queue = 0;
  lastElOfTse = 0;
  totalAt = 0;
  customers = [];

  size = parseInt(custSize.value) + 1;

  customers = Array(size)
    .fill()
    .map(() => customer());
  console.log("customers: ", customers);
  const tableHead = document.getElementById("table-head");
  const tableBody = document.getElementById("table-body");
  const tableBody2 = document.getElementById("table-body2");
  tableBody.innerHTML = "";
  tableHead.innerHTML = "";
  tableBody2.innerHTML = "";

  for (let i = 1; i < customers.length; i++) {
    {
      // Random IAT
      if (i > 1) {
        //manual
        // const ranArr=[913,727,15,948,309]
        // customers[i].randomIAT = ranArr[i-2]

        //auto
        customers[i].randomIAT = parseInt(Math.random() * 1000 + 1);
      }
    }
    {
      // IAT
      // =IF(B4 <= 125, 1, IF(B4 <= 250, 2, IF(B4 <= 375, 3, IF(B4 <= 500, 4, IF(B4 <= 625, 5, IF(B4 <= 750, 6, IF(B4 <= 875, 7, IF(B4 <= 1000, 8))))))))
      if (i === 1) {
        customers[i].iat = 0;
      } else if (customers[i].randomIAT <= 125) {
        customers[i].iat = 1;
      } else if (customers[i].randomIAT <= 250) {
        customers[i].iat = 2;
      } else if (customers[i].randomIAT <= 375) {
        customers[i].iat = 3;
      } else if (customers[i].randomIAT <= 500) {
        customers[i].iat = 4;
      } else if (customers[i].randomIAT <= 625) {
        customers[i].iat = 5;
      } else if (customers[i].randomIAT <= 750) {
        customers[i].iat = 6;
      } else if (customers[i].randomIAT <= 875) {
        customers[i].iat = 7;
      } else if (customers[i].randomIAT <= 1000) {
        customers[i].iat = 8;
      }
    }
    {
      // Arrival Time
      if (i > 1) {
        customers[i].arrival_time =
          customers[i - 1].arrival_time + customers[i].iat;
      }
    }
    {
      // Manual
      // const ranArr=[84,10,74,53,17,79]
      // customers[i].random_service_time =ranArr[i-1]

      //auto
      // Random Service Time
      customers[i].random_service_time = parseInt(Math.random() * 100 + 1);
    }
    {
      if (customers[i].random_service_time <= 10) {
        customers[i].service_time = 1;
      } else if (customers[i].random_service_time <= 30) {
        customers[i].service_time = 2;
      } else if (customers[i].random_service_time <= 60) {
        customers[i].service_time = 3;
      } else if (customers[i].random_service_time <= 85) {
        customers[i].service_time = 4;
      } else if (customers[i].random_service_time <= 95) {
        customers[i].service_time = 5;
      } else if (customers[i].random_service_time <= 100) {
        customers[i].service_time = 6;
      }
    }
    {
      // Time Service Begins
      customers[i].time_service_begin = Math.max(
        customers[i].arrival_time,
        customers[i - 1].time_service_ends
      );
    }
    {
      // Time Service Ends
      customers[i].time_service_ends =
        customers[i].time_service_begin + customers[i].service_time;
    }
    {
      // Waiting Time

      if (customers[i].time_service_begin > customers[i].arrival_time)
        customers[i].waiting_time =
          customers[i].time_service_begin - customers[i].arrival_time;
      else {
        customers[i].waiting_time = 0;
      }
    }
    {
      // Time Spent in System
      customers[i].time_spent_in_system =
        customers[i].time_service_ends - customers[i].arrival_time;
    }
    {
      // Idle Time of Server

      if (customers[i].time_service_begin > customers[i - 1].time_service_ends)
        customers[i].idle_time_of_server =
          customers[i].time_service_begin - customers[i - 1].time_service_ends;
      else customers[i].idle_time_of_server = 0;
    }
    totalCustomer = i;
    totalIAT += customers[i].iat;
    totalST += customers[i].service_time;
    totalIdle += customers[i].idle_time_of_server;
    totalWT += customers[i].waiting_time;
    if (customers[i].waiting_time > 0) {
      totalNumOfCustWait_in_queue++;
      console.log(totalNumOfCustWait_in_queue);
    }

    totalTSS += customers[i].time_spent_in_system;
    lastElOfTse = customers[i].time_service_ends;
    totalAt += customers[i].iat;
    console.log(totalAt);
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${i}</td>
        <td>${customers[i].randomIAT}</td>
        <td>${customers[i].iat}</td>
        <td>${customers[i].arrival_time}</td>
        <td>${customers[i].random_service_time}</td>
        <td>${customers[i].service_time}</td>
        <td>${customers[i].time_service_begin}</td>
        <td>${customers[i].waiting_time}</td>
        <td>${customers[i].time_service_ends}</td>
        
        <td>${customers[i].time_spent_in_system}</td>
        <td>${customers[i].idle_time_of_server}</td>
    `;
    tableBody.appendChild(tr);
  }
  const tr2 = document.createElement("tr");
  tr2.className = "fw-bolder";
  tr2.innerHTML = `
        <td>Total=${totalCustomer}</td>
        <td></td>
        <td>${totalIAT}</td>
        <td></td>
        
        <td></td>
        <td>${totalST}</td>
        <td></td>
        <td>${totalWT}</td>
        <td>${lastElOfTse}</td>
        <td>${totalTSS}</td>
        <td>${totalIdle}</td>

    `;
  tableBody.appendChild(tr2);

  const formulas = [
    {
      id: "1",
      description: "Average waiting time",
      formula: (totalWT / totalCustomer).toFixed(2) + "min",
    },
    {
      id: "2",
      description: "probability customer has to wait in queue",
      formula:
        (totalNumOfCustWait_in_queue / totalCustomer).toFixed(2) +
        " or " +
        Math.round((totalNumOfCustWait_in_queue / totalCustomer) * 100) +
        " %",
    },
    {
      id: "3",
      description: " probability idle time ",
      formula:
        (totalIdle / lastElOfTse).toFixed(2) +
        " or " +
        Math.round((totalIdle / lastElOfTse) * 100) +
        " %",
    },
    {
      id: "4",
      description: "Average Service time",
      formula: (totalST / totalCustomer).toFixed(2) + " mins",
    },
    {
      id: "5",
      description: " Averge time between arrival",
      formula: totalAt / (totalCustomer - 1) + " mins",
    },
    {
      id: "6",
      description: " Averge time custome spent in system",
      formula: (totalTSS / totalCustomer).toFixed(2) + " mins",
    },
    {
      id: "7",
      description: " Average time for those who wait ",
      formula: (totalWT / totalNumOfCustWait_in_queue).toFixed(2) + " mins",
    },
  ];
  console.log(totalAt, totalCustomer);
  formulas.map((item) => {
    const tr3 = document.createElement("tr");
    tr3.className = "fw-bolder";
    console.log(item);
    tr3.innerHTML = `
        <td>${item.description}</td>
        <td>${item.formula}</td>
     

    `;
    tableBody2.appendChild(tr3);
  });

  const keys = Object.keys(heading());
  keys.forEach((e) => {
    const th = document.createElement("th");
    th.innerText = e;

    tableHead.appendChild(th);
  });
  contentDiv.style.display ='block'
};
