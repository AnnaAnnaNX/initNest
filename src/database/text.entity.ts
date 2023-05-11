import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Text {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;
 
  @Column()
  public content: string;
}
 
export default Text;