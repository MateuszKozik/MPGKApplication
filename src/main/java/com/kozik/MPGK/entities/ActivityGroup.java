import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "activities_groups")
@Data
public class ActivityGroup{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "group_id", nullable = false)
    private Long groupId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "activities_groups") 
    private Set<Activity> activity;

    @OneToMany(mappedBy = "connections") 
    private Set<Connection> connection;

    public ActivityGroup(){}

    public ActivityGroup(String name)
    {
        this.name = name;
    }

}