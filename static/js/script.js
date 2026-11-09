fetch("/api/population")
  .then((response) => response.json())
  .then((populationData) => {
    fetch("/api/country/flag")
      .then((response) => response.json())
      .then((flagData) => {
        // Creating Map with Country and url, e.g acc["India"] = "https..."
        const flagMap = flagData.data.reduce((acc, item) => {
          acc[item.name] = item.flag;
          return acc;
        }, {});

        // Sorting Countries Alphabetically
        let sortedCountries = populationData.data
          .sort((a, b) => a.country.localeCompare(b.country))
          // Creating new array with population information and flag
          .map((country) => {
            const lastPopulationEntry = country.populationCounts.slice(-1)[0];
            return {
              ...country,
              population: lastPopulationEntry?.value || "Data not available",
              flag: flagMap[country.country] || null,
            };
          });

        const dropdown = document.getElementById("countryDropdown");
        const searchBox = document.getElementById("searchBox");

        function populateDropdown(countries) {
          // Reset dropDown
          dropdown.innerHTML = '<option value="">Select a country</option>';
          // Populating dropdown with or without filters
          countries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.country;
            option.textContent = country.country;
            dropdown.appendChild(option);
          });
        }

        populateDropdown(sortedCountries);

        // Adding functionality when clicked
        dropdown.addEventListener("change", () => {
          const selectedCountry = dropdown.value;

          const flagDisplay = document.getElementById("flagContainer");

          // Check if the user selected "Select a country" (empty value)
          if (selectedCountry === "") {
            // Clear the flag container and hide the table
            flagDisplay.innerHTML = "";
            document.getElementById("countryTable").style.display = "none";
            // Exit early since no country is selected
            return;
          }

          // Find the selected countrys data
          const countryData = sortedCountries.find(
            (country) => country.country === selectedCountry
          );

          if (countryData) {
            // Show the table
            document.getElementById("countryTable").style.display = "table";

            // Adding country name to table
            document.getElementById("selectedCountry").textContent =
              countryData.country;

            // Adding country population to table
            document.getElementById("selectedPopulation").textContent =
              countryData.population;

            // Display the flag
            if (countryData.flag) {
              flagDisplay.innerHTML = `<img src="${countryData.flag}" alt="${countryData.country} Flag" style="width: 50px; height: auto;">`;
            } else {
              flagDisplay.innerHTML = "<p>Flag not available</p>";
            }
          } else {
            // Hide the table if no valid country is selected
            document.getElementById("countryTable").style.display = "none";
          }
        });
        // Adding search function
        searchBox.addEventListener("input", () => {
          const query = searchBox.value.toLowerCase();
          const filteredCountries = sortedCountries.filter((country) =>
            country.country.toLowerCase().includes(query)
          );
          populateDropdown(filteredCountries);
        });
      })
      .catch((error) => console.error("Error fetching flag data:", error));
  })
  .catch((error) => console.error("Error fetching population data:", error));
