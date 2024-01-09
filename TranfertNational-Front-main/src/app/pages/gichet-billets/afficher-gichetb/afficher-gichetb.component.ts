import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afficher-gichetb',
  templateUrl: './afficher-gichetb.component.html',
  styleUrls: ['./afficher-gichetb.component.css']
})
export class AfficherGichetbComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  searchValue = '';
  visible = false;
  listOfData = [
    {
      name: 'John Brown',
      age: "0662054300",
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: "0670737899",
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: "0670737899",
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: "0670737899",
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: "0670737899",
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: "0708010399",
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: "0608129876",
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.age.indexOf(this.searchValue) !== -1);
  }

}
