class Task {
    constructor(title, level, timeWeight, periodicity, sop = "", sopLocation = "Task Board") {
      this.title = title;
      this.level = level;
      this.timeWeight = timeWeight;
      this.periodicity = periodicity;
      this.sop = sop;
      this.sopLocation = sopLocation;
    }
  
    updatePeriodicity(days) {
      this.periodicity = days;
    }
  }
  
  const tasks = [];
  
  const form = document.getElementById('taskForm');
  const fields = {
    title: document.getElementById('taskTitle'),
    level: document.getElementById('taskLevel'),
    weight: document.getElementById('taskWeight'),
    periodicity: document.getElementById('taskPeriodicity'),
    sopLocation: document.getElementById('taskSopLocation'),
    sop: document.getElementById('taskSop'),
  };
  const submitBtn = document.getElementById('submitTaskBtn');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskSelect = document.getElementById('taskSelect');
  
  let editingIndex = null;
  
  function enableForm(enabled) {
    Object.values(fields).forEach(field => field.disabled = !enabled);
    submitBtn.disabled = !enabled;
  }
  
  function resetForm() {
    fields.title.value = "";
    fields.level.value = "1";
    fields.weight.value = "0";
    fields.periodicity.value = "";
    fields.sopLocation.value = "Task Board";
    fields.sop.value = "";
  }
  
  function populateForm(task) {
    fields.title.value = task.title;
    fields.level.value = task.level;
    fields.weight.value = task.timeWeight;
    fields.periodicity.value = task.periodicity;
    fields.sopLocation.value = task.sopLocation;
    fields.sop.value = task.sop;
  }
  
  function refreshTaskDropdown() {
    taskSelect.innerHTML = `<option value="">-- Select Task --</option>`;
    tasks.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = task.title;
      taskSelect.appendChild(option);
    });
  }
  
  addTaskBtn.addEventListener('click', () => {
    editingIndex = null;
    resetForm();
    enableForm(true);
  });
  
  taskSelect.addEventListener('change', () => {
    const index = taskSelect.value;
    if (index !== "") {
      editingIndex = Number(index);
      populateForm(tasks[editingIndex]);
      enableForm(true);
    } else {
      editingIndex = null;
      enableForm(false);
      resetForm();
    }
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskData = new Task(
      fields.title.value,
      Number(fields.level.value),
      Number(fields.weight.value),
      Number(fields.periodicity.value),
      fields.sop.value,
      fields.sopLocation.value
    );
  
    if (editingIndex !== null) {
      tasks[editingIndex] = taskData;
    } else {
      tasks.push(taskData);
    }
  
    resetForm();
    enableForm(false);
    editingIndex = null;
    refreshTaskDropdown();
  });
  