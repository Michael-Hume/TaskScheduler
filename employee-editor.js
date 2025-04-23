class Employee {
    constructor(name, maxLevel) {
      this.name = name;
      this.maxLevel = maxLevel;
      this.workDays = [];
      this.daysOff = [];
    }
  }
  
  const employees = [];
  
  const empForm = document.getElementById('employeeForm');
  const fields = {
    name: document.getElementById('empName'),
    maxLevel: document.getElementById('empMaxLevel'),
    workDays: document.getElementById('empWorkDays'),
    daysOff: document.getElementById('empDaysOff'),
  };
  const submitBtn = document.getElementById('submitEmpBtn');
  const addBtn = document.getElementById('addEmployeeBtn');
  const select = document.getElementById('employeeSelect');
  
  let editingIndex = null;
  
  function enableForm(enabled) {
    Object.values(fields).forEach(field => field.disabled = !enabled);
    submitBtn.disabled = !enabled;
  }
  
  function resetForm() {
    fields.name.value = "";
    fields.maxLevel.value = "1";
    fields.workDays.value = "";
    fields.daysOff.value = "";
  }
  
  function populateForm(emp) {
    fields.name.value = emp.name;
    fields.maxLevel.value = emp.maxLevel;
    fields.workDays.value = emp.workDays.join(",");
    fields.daysOff.value = emp.daysOff.join(",");
  }
  
  function refreshDropdown() {
    select.innerHTML = `<option value="">-- Select Employee --</option>`;
    employees.forEach((emp, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = emp.name;
      select.appendChild(option);
    });
  }
  
  addBtn.addEventListener('click', () => {
    editingIndex = null;
    resetForm();
    enableForm(true);
  });
  
  select.addEventListener('change', () => {
    const index = select.value;
    if (index !== "") {
      editingIndex = Number(index);
      populateForm(employees[editingIndex]);
      enableForm(true);
    } else {
      editingIndex = null;
      enableForm(false);
      resetForm();
    }
  });
  
  empForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emp = new Employee(
      fields.name.value,
      Number(fields.maxLevel.value)
    );
    emp.workDays = fields.workDays.value.split(',').map(day => day.trim()).filter(Boolean);
    emp.daysOff = fields.daysOff.value.split(',').map(date => date.trim()).filter(Boolean);
  
    if (editingIndex !== null) {
      employees[editingIndex] = emp;
    } else {
      employees.push(emp);
    }
  
    resetForm();
    enableForm(false);
    editingIndex = null;
    refreshDropdown();
  });
  