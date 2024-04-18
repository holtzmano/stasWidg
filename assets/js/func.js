function LoadWidget() {
  console.log("Widget loaded in Contact Roles module");
  // Optionally, you might want to fetch and display contact roles data as well
  ZOHO.CRM.API.getAllRecords({Entity: "Contacts_Roles", page: 1, per_page: 200})
  .then(function(data) {
      console.log("Contacts Roles Data", data.data);
      const tbody = $("#contacts-tbody");
      data.data.forEach(contactRole => {
          const tr = $("<tr>");
          tr.append($("<td>").text(contactRole.Role));
          tr.append($("<td>").text(contactRole.Contact)); // Assuming 'Contact' is a relationship field that includes contact name
          tr.append($("<td>").text(contactRole.Contact.ID_NO)); // Assuming 'ID_NO' is a field on Contacts, accessed through relationship
          tbody.append(tr);
      });
  }).catch(function(error) {
      console.error("Failed to load contact roles:", error);
  });
}


ZOHO.embeddedApp.on("PageLoad", function (data) {
  console.log(data);
  console.log(data.EntityId);
  console.log(data.Entity);
  LoadWidget(data.entity);
});

ZOHO.embeddedApp.init();

