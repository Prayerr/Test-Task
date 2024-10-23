export interface INode {
  id: number;
  name: string;
}

export interface IDevice {
  id: number;
  name: string;
  nodes: INode[];
}
