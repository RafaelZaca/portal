export class ErrorsDialogModel 
{
    constructor
      (
      public name: string,
      public icon: string,
      public title: string,
      public message: string,
      public reload: boolean,
      public back: boolean,
      public close: boolean
    )
    {

    }
}
