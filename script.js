const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Collect patient information
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const reason = document.getElementById("reason").value.trim();


    // FEATURE 1: Validate required fields
    if (
        firstName === "" ||
        lastName === "" ||
        dob === "" ||
        phone === "" ||
        email === "" ||
        reason === ""
    ) {
        message.textContent = "Please complete all required fields.";
        return;
    }


    // FEATURE 1: Create registered patient
    const patient = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        phone: phone,
        email: email,
        reason: reason
    };


    // FEATURE 1: Save registered patient
    let patients =
        JSON.parse(localStorage.getItem("patients")) || [];

    patients.push(patient);

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    // Get current active queue
    let activeQueue =
        JSON.parse(localStorage.getItem("activeQueue")) || [];


    // FEATURE 3: Generate unique queue number
    let queueNumber = activeQueue.length + 1;

    while (
        activeQueue.some(
            patient => patient.queueNumber === queueNumber
        )
    ) {
        queueNumber++;
    }


    // FEATURE 2, 3, and 4:
    // Create queue entry
    const queuePatient = {
        firstName: firstName,
        lastName: lastName,
        reason: reason,

        // US-02.2
        joinedTime: new Date().toLocaleString(),

        // Used for sorting by arrival time
        joinedTimestamp: Date.now(),

        // US-02.3
        status: "Waiting",

        // US-03.1
        queueNumber: queueNumber,

        // US-04.1
        urgency: "Low"
    };


    // US-02.1
    activeQueue.push(queuePatient);


    // Save active queue
    localStorage.setItem(
        "activeQueue",
        JSON.stringify(activeQueue)
    );


    // Save current patient's information
    localStorage.setItem(
        "currentPatient",
        JSON.stringify(queuePatient)
    );


    // Send patient to queue page
    window.location.href = "queue.html";

});