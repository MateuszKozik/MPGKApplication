import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "persons")
@Data
public class Person{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "personID", nullable = false)
    private Long personID;

    @Column(name = "name", nullable = true, length = 35)
    private String name;

    @Column(name = "surname", nullable = true, length = 35)
    private String surname;

    @OneToMany(mappedBy = "persons") 
    private Set<Fluids_registry> fluids_registry;

    @OneToOne(mappedBy = "persons")
    private Users users;

    @ManyToMany(mappedBy = "persons")
    private Set<Connections> connections = new HashSet<Connections>();

    @OneToMany(mappedBy = "persons") 
    private Set<Overviews> overviews;

    


    public Person(){}

    public Person(String name,String surname)
    {
        this.name = name;
        this.surname = surname;
    }




}