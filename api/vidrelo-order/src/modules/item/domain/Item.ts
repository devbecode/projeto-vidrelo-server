export class Item {
  public static ITEM_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  };

  public id: string;
  public status: string;
  public category: string;
  public item: string;
  public createdAt: string;
  public updatedAt: string;
}
